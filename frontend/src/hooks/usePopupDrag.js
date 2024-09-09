// usePopupDrag.js
import { useEffect } from 'react';

const usePopupDrag = (popupContent) => {
  useEffect(() => {
    const popup = document.querySelector('.popup');
    if (!popup) return; // Assicurati che il popup esista prima di procedere

    let isDragging = false;
    let offsetX, offsetY;

    const onMouseDown = (e) => {
      isDragging = true;
      offsetX = e.clientX - popup.getBoundingClientRect().left;
      offsetY = e.clientY - popup.getBoundingClientRect().top;
      popup.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      popup.style.cursor = 'move';
    };

    popup.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Cleanup function per rimuovere gli event listener
    return () => {
      popup.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [popupContent]);
};

export default usePopupDrag;
