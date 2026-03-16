import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const enlarge = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        cursorRef.current?.classList.add('cursor-enlarged');
      }
    };

    const shrink = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"]')) {
        cursorRef.current?.classList.remove('cursor-enlarged');
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enlarge);
    document.addEventListener('mouseout', shrink);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enlarge);
      document.removeEventListener('mouseout', shrink);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
};

export default CustomCursor;
