'use client';

import { useCallback } from 'react';

export function useConfettiBurst() {
  const burstAt = useCallback((rect: DOMRect, color: string) => {
    const burst = document.createElement('div');
    burst.className = 'pop-burst';
    burst.style.left = rect.left + 'px';
    burst.style.top = rect.top + 'px';
    burst.style.width = rect.width + 'px';
    burst.style.height = rect.height + 'px';
    
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('span');
      const angle = (Math.PI * 2 * i) / 10;
      const dist = 40 + Math.random() * 20;
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      p.style.background = color;
      burst.appendChild(p);
    }
    
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 550);
  }, []);

  return { burstAt };
}
