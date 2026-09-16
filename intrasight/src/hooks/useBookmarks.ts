import { useState, useCallback } from 'react';

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

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const addBookmark = useCallback((time: number, note?: string) => {
    const newBookmark: Bookmark = {
      id: `bookmark-${Date.now()}`,
      time,
      number: bookmarks.length + 1,
      note
    };
    setBookmarks(prev => [...prev, newBookmark].sort((a, b) => a.time - b.time));
    return newBookmark;
  }, [bookmarks.length]);

  const removeBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prev => {
      const filtered = prev.filter(b => b.id !== bookmarkId);
      // Renumber remaining bookmarks
      return filtered.map((bookmark, index) => ({
        ...bookmark,
        number: index + 1
      }));
    });
  }, []);

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

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    getBookmarkAtTime,
    hasBookmarkAtTime,
    clearAllBookmarks
  };
}
