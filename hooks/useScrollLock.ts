import { useEffect, useState, useCallback } from 'react';

/**
 * Custom hook để quản lý việc khóa/mở khóa scroll của body
 * Có thể tái sử dụng ở nhiều component khác nhau
 * 
 * @param isLocked - Boolean để bật/tắt khóa scroll
 * @param options - Tùy chọn bổ sung
 */
export function useScrollLock(
  isLocked: boolean,
  options: {
    /** Padding để bù trừ scrollbar width khi khóa scroll */
    compensateScrollbar?: boolean;
    /** Selector của element cần khóa scroll (mặc định là body) */
    targetElement?: string;
    /** Custom class name để thêm vào element khi khóa */
    lockClassName?: string;
  } = {}
) {
  const {
    compensateScrollbar = true,
    targetElement = 'body',
    lockClassName = 'scroll-locked'
  } = options;

  useEffect(() => {
    const element = document.querySelector(targetElement) as HTMLElement;
    
    if (!element) {
      console.warn(`useScrollLock: Element "${targetElement}" not found`);
      return;
    }

    if (isLocked) {
      // Lưu trạng thái scroll hiện tại
      const scrollY = window.scrollY;
      
      // Khóa scroll
      element.style.overflow = 'hidden';
      element.style.position = 'fixed';
      element.style.top = `-${scrollY}px`;
      element.style.width = '100%';
      
      // Bù trừ scrollbar width nếu cần
      if (compensateScrollbar) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarWidth > 0) {
          element.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
      
      // Thêm class nếu được chỉ định
      if (lockClassName) {
        element.classList.add(lockClassName);
      }
      
      // Lưu scroll position để restore sau
      element.dataset.scrollY = scrollY.toString();
      
    } else {
      // Khôi phục scroll
      element.style.overflow = '';
      element.style.position = '';
      element.style.top = '';
      element.style.width = '';
      element.style.paddingRight = '';
      
      // Xóa class
      if (lockClassName) {
        element.classList.remove(lockClassName);
      }
      
      // Khôi phục vị trí scroll
      const savedScrollY = element.dataset.scrollY;
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY, 10));
        delete element.dataset.scrollY;
      }
    }

    // Cleanup function
    return () => {
      if (isLocked) {
        // Khôi phục scroll nếu component unmount
        element.style.overflow = '';
        element.style.position = '';
        element.style.top = '';
        element.style.width = '';
        element.style.paddingRight = '';
        
        if (lockClassName) {
          element.classList.remove(lockClassName);
        }
        
        const savedScrollY = element.dataset.scrollY;
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY, 10));
          delete element.dataset.scrollY;
        }
      }
    };
  }, [isLocked, compensateScrollbar, targetElement, lockClassName]);
}

/**
 * Hook đơn giản để toggle scroll lock
 * @returns [isLocked, toggleLock] - Tuple với state và function toggle
 */
export function useScrollLockToggle() {
  const [isLocked, setIsLocked] = useState(false);
  
  const toggleLock = useCallback((lock?: boolean) => {
    if (lock !== undefined) {
      setIsLocked(lock);
    } else {
      setIsLocked(prev => !prev);
    }
  }, []);
  
  useScrollLock(isLocked);
  
  return [isLocked, toggleLock] as const;
}

/**
 * Hook để lock scroll cho modal/drawer
 * Tự động unlock khi component unmount
 */
export function useModalScrollLock(isOpen: boolean) {
  useScrollLock(isOpen, {
    compensateScrollbar: true,
    lockClassName: 'modal-open'
  });
}

/**
 * Hook để lock scroll cho mobile menu
 */
export function useMobileMenuScrollLock(isOpen: boolean) {
  useScrollLock(isOpen, {
    compensateScrollbar: true,
    lockClassName: 'mobile-menu-open'
  });
}
