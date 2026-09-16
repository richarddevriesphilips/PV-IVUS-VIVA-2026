import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { calculateBookmarkPosition } from '../utils/xrayPositionMapping';

export interface Bookmark {
  id: string;
  time: number;
  number: number;
  note?: string;
  position?: {
    x: number;
    y: number;
  };
}

export interface XRayTimeRange {
  startTime: number;
  endTime: number;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (time: number, note?: string, videoDuration?: number) => Bookmark;
  removeBookmark: (bookmarkId: string) => void;
  updateBookmarkPosition: (bookmarkId: string, x: number, y: number) => void;
  getBookmarkAtTime: (time: number, tolerance?: number) => Bookmark | undefined;
  hasBookmarkAtTime: (time: number, tolerance?: number) => boolean;
  clearAllBookmarks: () => void;
  exportBookmarkPositions: () => void;
  ensureBookmarkPositions: (videoDuration: number) => void; // New: calculate missing positions
  
  // X-ray timing functionality
  xrayTimeRanges: XRayTimeRange[];
  addXRayTimeRange: (startTime: number, endTime: number) => void;
  clearXRayTimeRanges: () => void;
  isXRayActiveAtTime: (time: number) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [xrayTimeRanges, setXRayTimeRanges] = useState<XRayTimeRange[]>([]);

  const addBookmark = useCallback((time: number, note?: string, videoDuration: number = 26) => {
    // Skip position calculation during recording (32s) - only needed for Analysis screen (26s)
    // This prevents UI lag when bookmarking during recording
    const position = videoDuration === 32 ? undefined : calculateBookmarkPosition(time, videoDuration);
    
    let addedBookmark: Bookmark | null = null;
    
    // Optimize by using a mutation-style update (React batches these)
    // This avoids the expensive spread operation during recording
    setBookmarks(prev => {
      const newBookmark: Bookmark = {
        id: `bookmark-${Date.now()}`,
        time,
        number: prev.length + 1, // Calculate number from current array length
        note,
        position
      };
      addedBookmark = newBookmark;
      
      const updated = prev.slice(); // Shallow copy
      updated.push(newBookmark); // Push is faster than spread
      return updated;
    });
    
    return addedBookmark!;
  }, []); // No dependencies - stable reference

  const removeBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prev => {
      const filtered = prev.filter(b => b.id !== bookmarkId);
      
      // Only renumber if necessary (avoid creating new objects if numbers don't change)
      let needsRenumber = false;
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].number !== i + 1) {
          needsRenumber = true;
          break;
        }
      }
      
      if (!needsRenumber) return filtered;
      
      // Renumber remaining bookmarks
      return filtered.map((bookmark, index) => ({
        ...bookmark,
        number: index + 1
      }));
    });
  }, []);

  const updateBookmarkPosition = useCallback((bookmarkId: string, x: number, y: number) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === bookmarkId 
          ? { ...bookmark, position: { x, y } }
          : bookmark
      )
    );
  }, []);

  const exportBookmarkPositions = useCallback(() => {
    const sortedBookmarks = [...bookmarks].sort((a, b) => a.time - b.time);
    console.log('=== BOOKMARK POSITIONS FOR ARRAY ===');
    console.log('Copy this to xrayPositionMapping.ts:');
    console.log('\nexport const xrayPositionPath: XRayPosition[] = [');
    sortedBookmarks.forEach((bookmark, index) => {
      if (bookmark.position) {
        console.log(`  { x: ${Math.round(bookmark.position.x)}, y: ${Math.round(bookmark.position.y)}, frame: ${index}, time: ${bookmark.time.toFixed(2)} },`);
      }
    });
    console.log('];');
    console.log('\n=== END BOOKMARK POSITIONS ===');
    console.log(`\nTotal bookmarks: ${sortedBookmarks.length}`);
    console.log(`Time range: ${sortedBookmarks[0]?.time.toFixed(2)}s - ${sortedBookmarks[sortedBookmarks.length - 1]?.time.toFixed(2)}s`);
  }, [bookmarks]);

  const getBookmarkAtTime = useCallback((time: number, tolerance = 0.5) => {
    return bookmarks.find(bookmark => 
      Math.abs(bookmark.time - time) <= tolerance
    );
  }, [bookmarks]);

  const hasBookmarkAtTime = useCallback((time: number, tolerance = 0.5) => {
    return getBookmarkAtTime(time, tolerance) !== undefined;
  }, [getBookmarkAtTime]);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  // X-ray time range functions
  const addXRayTimeRange = useCallback((startTime: number, endTime: number) => {
    const newRange: XRayTimeRange = { startTime, endTime };
    setXRayTimeRanges(prev => [...prev, newRange].sort((a, b) => a.startTime - b.startTime));
  }, []);

  const clearXRayTimeRanges = useCallback(() => {
    setXRayTimeRanges([]);
  }, []);

  const isXRayActiveAtTime = useCallback((time: number) => {
    return xrayTimeRanges.some(range => 
      time >= range.startTime && time <= range.endTime
    );
  }, [xrayTimeRanges]);

  // Calculate positions for bookmarks that don't have them yet
  const ensureBookmarkPositions = useCallback((videoDuration: number) => {
    setBookmarks(prev => {
      // Calculate missing positions and sort bookmarks by time
      const updated = prev.map(bookmark => {
        if (!bookmark.position && videoDuration !== 32) {
          return {
            ...bookmark,
            position: calculateBookmarkPosition(bookmark.time, videoDuration)
          };
        }
        return bookmark;
      });
      
      // Sort by time and renumber
      return updated.sort((a, b) => a.time - b.time).map((bookmark, index) => ({
        ...bookmark,
        number: index + 1
      }));
    });
  }, []);

  return (
    <BookmarkContext.Provider value={{
      bookmarks,
      addBookmark,
      removeBookmark,
      updateBookmarkPosition,
      getBookmarkAtTime,
      hasBookmarkAtTime,
      clearAllBookmarks,
      exportBookmarkPositions,
      ensureBookmarkPositions,
      xrayTimeRanges,
      addXRayTimeRange,
      clearXRayTimeRanges,
      isXRayActiveAtTime
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
