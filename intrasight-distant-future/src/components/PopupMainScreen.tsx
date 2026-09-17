import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PopupMainScreenProps {
  popupWindow: Window | null;
  children: React.ReactNode;
  onClose: () => void;
}

export const PopupMainScreen: React.FC<PopupMainScreenProps> = ({
  popupWindow,
  children,
  onClose
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!popupWindow) return;

    // Check if popup is already initialized
    if (containerRef.current && popupWindow.document.getElementById('popup-root')) {
      setIsReady(true);
      return;
    }

    // Set up popup window content only once
    popupWindow.document.title = 'IVUS Analysis - Main Screen';
    
    // Copy all stylesheets from the main window
    const mainDocument = document;
    const popupDocument = popupWindow.document;
    
    // Only clear and setup if not already done
    if (!popupDocument.getElementById('popup-root')) {
      // Clear existing content
      popupDocument.head.innerHTML = '';
      popupDocument.body.innerHTML = '';
      
      // Copy meta tags
      const metaTags = mainDocument.querySelectorAll('meta');
      metaTags.forEach(meta => {
        const newMeta = popupDocument.createElement('meta');
        Array.from(meta.attributes).forEach(attr => {
          newMeta.setAttribute(attr.name, attr.value);
        });
        popupDocument.head.appendChild(newMeta);
      });
      
      // Copy all link tags (stylesheets, fonts, etc.)
      const linkTags = mainDocument.querySelectorAll('link');
      linkTags.forEach(link => {
        const newLink = popupDocument.createElement('link');
        Array.from(link.attributes).forEach(attr => {
          newLink.setAttribute(attr.name, attr.value);
        });
        popupDocument.head.appendChild(newLink);
      });
      
      // Copy all style tags
      const styleTags = mainDocument.querySelectorAll('style');
      styleTags.forEach(style => {
        const newStyle = popupDocument.createElement('style');
        newStyle.textContent = style.textContent;
        popupDocument.head.appendChild(newStyle);
      });
      
      // Add custom styles for popup
      const customStyles = popupDocument.createElement('style');
      customStyles.textContent = `
        @font-face {
          font-family: 'CentraleSans';
          src: url('./assets/fonts/CentraleSans-Book.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'CentraleSans';
          src: url('./assets/fonts/CentraleSans-Medium.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'CentraleSans';
          src: url('./assets/fonts/CentraleSans-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        body { 
          margin: 0; 
          padding: 0; 
          font-family: 'CentraleSans', sans-serif; 
          background: #000;
          overflow: hidden;
        }
        #popup-root {
          width: 100vw;
          height: 100vh;
        }
      `;
      popupDocument.head.appendChild(customStyles);
      
      // Create container for React content
      const container = popupDocument.createElement('div');
      container.id = 'popup-root';
      popupDocument.body.appendChild(container);
      containerRef.current = container;
    } else {
      // Container already exists, just reference it
      containerRef.current = popupDocument.getElementById('popup-root') as HTMLDivElement;
    }
    
    // Set ready state after DOM is set up
    setIsReady(true);
    
    // Handle popup close
    const handleBeforeUnload = () => {
      onClose();
    };
    
    popupWindow.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      popupWindow.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [popupWindow, onClose]);

  // Don't render anything if no popup window, container, or not ready
  if (!popupWindow || !containerRef.current || !isReady) {
    return null;
  }

  // Render children into the popup window using React portal
  return createPortal(children, containerRef.current);
};
