import { useState, useEffect, type RefObject, useCallback } from 'react';

function useMenuDirection(ref: RefObject<HTMLElement>): string {
  const [menuDirection, setMenuDirection] = useState<string>('top');

  const updateMenuDirection =useCallback(()=> {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    if (rect.y+rect.height + 10 > screenHeight) {
      setMenuDirection('bottom');
    } else {
      setMenuDirection('top');
    }
  },[ref])
  
  useEffect(() => {
    updateMenuDirection();
  }, [updateMenuDirection]);
  

  return menuDirection;
}

export default useMenuDirection;
