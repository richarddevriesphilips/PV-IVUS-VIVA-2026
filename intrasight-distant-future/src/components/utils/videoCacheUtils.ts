interface CachedVideoData {
  url: string;
  blob: Blob;
  timestamp: number;
  size: number;
}

class VideoCacheManager {
  private dbName = 'IVUSVideoCache';
  private version = 1;
  private storeName = 'videos';
  private maxCacheSize = 500 * 1024 * 1024; // 500MB max cache
  private maxAge = 24 * 60 * 60 * 1000; // 24 hours
  private cachingEnabled = true;

  private async openDB(): Promise<IDBDatabase | null> {
    try {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
        
        request.onerror = () => {
          console.warn('IndexedDB not available:', request.error);
          resolve(null);
        };
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
          try {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(this.storeName)) {
              const store = db.createObjectStore(this.storeName, { keyPath: 'url' });
              store.createIndex('timestamp', 'timestamp', { unique: false });
            }
          } catch (error) {
            console.warn('Failed to setup IndexedDB:', error);
            resolve(null);
          }
        };
      });
    } catch (error) {
      console.warn('IndexedDB not available:', error);
      return null;
    }
  }

  async cacheVideo(url: string): Promise<string> {
    // Always return original URL immediately, try caching in background
    this.attemptBackgroundCache(url);
    return url;
  }

  private async attemptBackgroundCache(url: string): Promise<void> {
    if (!this.cachingEnabled) return;
    
    try {
      console.log('Attempting background cache for:', url);
      
      // Check if already cached
      const cachedUrl = await this.getCachedVideoUrl(url);
      if (cachedUrl && cachedUrl !== url) {
        console.log('Video already cached:', url);
        return;
      }

      // Try to fetch with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(url, {
        signal: controller.signal,
        mode: 'no-cors', // Try no-cors mode to avoid CORS issues
      });
      
      clearTimeout(timeoutId);

      if (!response.ok && response.type !== 'opaque') {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Only proceed if we got a reasonable sized blob
      if (blob.size === 0) {
        console.warn('Received empty blob, skipping cache for:', url);
        return;
      }

      const db = await this.openDB();
      if (!db) {
        console.warn('Cannot cache video - IndexedDB not available');
        return;
      }
      
      // Store in IndexedDB
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      const cacheData: CachedVideoData = {
        url,
        blob,
        timestamp: Date.now(),
        size: blob.size
      };
      
      await new Promise<void>((resolve, reject) => {
        const request = store.put(cacheData);
        request.onsuccess = () => {
          console.log('Video cached successfully in background:', url);
          resolve();
        };
        request.onerror = () => {
          console.warn('Failed to store video in cache:', request.error);
          resolve(); // Don't reject, just resolve
        };
      });
      
      // Clean up old entries if needed
      await this.cleanupCache();
      
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('Video caching timed out:', url);
        } else if (error.message.includes('CORS')) {
          console.warn('CORS error caching video:', url, '- This is expected for cross-origin videos');
        } else {
          console.warn('Failed to cache video in background:', url, error.message);
        }
      } else {
        console.warn('Failed to cache video in background:', url, error);
      }
      
      // Disable caching for this session if we keep getting errors
      this.cachingEnabled = false;
    }
  }

  async getCachedVideoUrl(url: string): Promise<string | null> {
    try {
      const db = await this.openDB();
      if (!db) return null;
      
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const cached = await new Promise<CachedVideoData | null>((resolve, reject) => {
        const request = store.get(url);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => resolve(null); // Don't reject, just resolve null
      });
      
      if (!cached) return null;
      
      // Check if cache is expired
      if (Date.now() - cached.timestamp > this.maxAge) {
        await this.removeCachedVideo(url);
        return null;
      }
      
      // Create object URL from cached blob
      return URL.createObjectURL(cached.blob);
      
    } catch (error) {
      console.warn('Failed to get cached video:', error);
      return null;
    }
  }

  async removeCachedVideo(url: string): Promise<void> {
    try {
      const db = await this.openDB();
      if (!db) return;
      
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(url);
        request.onsuccess = () => resolve();
        request.onerror = () => resolve(); // Don't reject
      });
    } catch (error) {
      console.warn('Failed to remove cached video:', error);
    }
  }

  async cleanupCache(): Promise<void> {
    try {
      const db = await this.openDB();
      if (!db) return;
      
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // Get all entries
      const allEntries = await new Promise<CachedVideoData[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]); // Don't reject
      });
      
      // Calculate total size
      const totalSize = allEntries.reduce((sum, entry) => sum + entry.size, 0);
      
      if (totalSize > this.maxCacheSize) {
        // Sort by timestamp (oldest first)
        allEntries.sort((a, b) => a.timestamp - b.timestamp);
        
        // Remove oldest entries until under size limit
        let currentSize = totalSize;
        for (const entry of allEntries) {
          if (currentSize <= this.maxCacheSize * 0.8) break; // Leave 20% buffer
          
          await new Promise<void>((resolve) => {
            const deleteRequest = store.delete(entry.url);
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => resolve();
          });
          
          currentSize -= entry.size;
          console.log('Removed cached video to free space:', entry.url);
        }
      }
      
      // Remove expired entries
      const now = Date.now();
      for (const entry of allEntries) {
        if (now - entry.timestamp > this.maxAge) {
          await new Promise<void>((resolve) => {
            const deleteRequest = store.delete(entry.url);
            deleteRequest.onsuccess = () => resolve();
            deleteRequest.onerror = () => resolve();
          });
          console.log('Removed expired cached video:', entry.url);
        }
      }
      
    } catch (error) {
      console.warn('Failed to cleanup cache:', error);
    }
  }

  async clearAllCache(): Promise<void> {
    try {
      const db = await this.openDB();
      if (!db) return;
      
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => resolve(); // Don't reject
      });
      
      console.log('All cached videos cleared');
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }

  async getCacheStats(): Promise<{ count: number; totalSize: number }> {
    try {
      const db = await this.openDB();
      if (!db) return { count: 0, totalSize: 0 };
      
      const transaction = db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      
      const allEntries = await new Promise<CachedVideoData[]>((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => resolve([]); // Don't reject
      });
      
      return {
        count: allEntries.length,
        totalSize: allEntries.reduce((sum, entry) => sum + entry.size, 0)
      };
    } catch (error) {
      console.warn('Failed to get cache stats:', error);
      return { count: 0, totalSize: 0 };
    }
  }
}

export const videoCacheManager = new VideoCacheManager();

export const VideoCacheUtils = {
  cacheVideo: (url: string) => videoCacheManager.cacheVideo(url),
  getCachedVideoUrl: (url: string) => videoCacheManager.getCachedVideoUrl(url),
  clearCache: () => videoCacheManager.clearAllCache(),
  getCacheStats: () => videoCacheManager.getCacheStats(),
};