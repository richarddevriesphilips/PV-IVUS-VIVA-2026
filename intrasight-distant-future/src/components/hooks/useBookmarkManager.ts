import { useState, useCallback } from 'react';
import { BookmarkData } from '../types';
import { APP_CONSTANTS } from '../constants/appConstants';

export function useBookmarkManager() {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [nextBookmarkId, setNextBookmarkId] = useState(APP_CONSTANTS.INITIAL_NEXT_BOOKMARK_ID);

  /**
   * Check if scrubber is on an existing bookmark
   */
  const getBookmarkAtScrubber = useCallback((scrubberPosition: number) => {
    return bookmarks.find(
      (bookmark) =>
        Math.abs(bookmark.position - scrubberPosition) < APP_CONSTANTS.TOLERANCES.BOOKMARK_PROXIMITY
    );
  }, [bookmarks]);

  /**
   * Toggle bookmark at current scrubber position
   */
  const handleBookmarkToggle = useCallback((scrubberPosition: number, currentTime: number, xrayPosition?: { x: number; y: number }) => {
    const existingBookmark = getBookmarkAtScrubber(scrubberPosition);

    if (existingBookmark) {
      // Remove bookmark
      setBookmarks((prev) =>
        prev.filter((b) => b.id !== existingBookmark.id)
      );
    } else {
      // Add new bookmark
      const newBookmark: BookmarkData = {
        id: nextBookmarkId,
        position: scrubberPosition,
        time: currentTime,
        xrayPosition: xrayPosition, // Store X-ray coordinates where bookmark was placed
      };
      setBookmarks((prev) =>
        [...prev, newBookmark].sort((a, b) => a.position - b.position)
      );
      setNextBookmarkId((prev) => prev + 1);
    }
  }, [getBookmarkAtScrubber, nextBookmarkId]);

  /**
   * Handle bookmark click to seek to that position
   */
  const handleBookmarkClick = useCallback((
    bookmark: BookmarkData,
    setScrubberPosition: (position: number) => void,
    setCurrentTime: (time: number) => void,
    updateVideoTimes: (time: number, duringDrag: boolean) => void
  ) => {
    setScrubberPosition(bookmark.position);
    setCurrentTime(bookmark.time);
    updateVideoTimes(bookmark.time, false);
  }, []);

  /**
   * Get bookmark button text based on current state
   */
  const getBookmarkButtonText = useCallback((scrubberPosition: number) => {
    const bookmarkAtScrubber = getBookmarkAtScrubber(scrubberPosition);
    return bookmarkAtScrubber ? "Remove Bookmark" : "Bookmark";
  }, [getBookmarkAtScrubber]);

  /**
   * Reset all bookmarks to initial state
   */
  const resetBookmarks = useCallback(() => {
    setBookmarks([]);
    setNextBookmarkId(APP_CONSTANTS.INITIAL_NEXT_BOOKMARK_ID);
  }, []);

  return {
    bookmarks,
    setBookmarks,
    nextBookmarkId,
    setNextBookmarkId,
    getBookmarkAtScrubber,
    handleBookmarkToggle,
    handleBookmarkClick,
    getBookmarkButtonText,
    resetBookmarks,
  };
}