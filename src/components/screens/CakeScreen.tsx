'use client';

import React, { useState } from 'react';
import type { PageConfig } from '@/lib/supabase';
import { useConfettiBurst } from '@/hooks/useConfettiBurst';

interface Props {
  config: PageConfig;
  onNext: () => void;
  onPrev: () => void;
}

export default function CakeScreen({ config, onNext, onPrev }: Props) {
  const { burstAt } = useConfettiBurst();
  const [cutSlices, setCutSlices] = useState<boolean[]>(Array(6).fill(false));
  const svgRef = React.useRef<SVGSVGElement>(null);
  
  const cx = 100, cy = 100, r = 88;
  const cakeColors = config.cake_colors && config.cake_colors.length >= 2 
    ? [config.cake_colors[0], config.cake_colors[1], config.cake_colors[0], config.cake_colors[1], config.cake_colors[0], config.cake_colors[1]]
    : ['#FFF1E6', '#FFE7D6', '#FFF1E6', '#FFE7D6', '#FFF1E6', '#FFE7D6'];
  const totalSlices = 6;

  function polar(angleDeg: number, radius: number) {
    const a = (angleDeg - 90) * Math.PI / 180;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  }

  const handleCut = (i: number) => {
    if (cutSlices[i]) return;

    // Trigger burst
    const svgRect = svgRef.current?.getBoundingClientRect();
    if (svgRect) {
      const startA = i * 60;
      const endA = startA + 60;
      const [x1, y1] = polar(startA, r);
      const [x2, y2] = polar(endA, r);
      
      const px = svgRect.left + (svgRect.width * ((x1 + x2 + cx) / 3) / 200);
      const py = svgRect.top + (svgRect.height * ((y1 + y2 + cy) / 3) / 200);
      burstAt({ left: px - 10, top: py - 10, width: 20, height: 20 } as DOMRect, '#E3B23C');
    }

    setCutSlices((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  const cutCount = cutSlices.filter(Boolean).length;
  const isComplete = cutCount === totalSlices;

  return (
    <>
      <button className="backdot" onClick={onPrev}>&larr;</button>
      <div className="cake-head">
        <h2>{config.cake_heading}</h2>
        <p>{config.cake_subtext}</p>
      </div>
      
      <div className="cake-wrap">
        <svg ref={svgRef} id="cakeSvg" viewBox="0 0 200 200" width="100%" height="100%">
          {Array.from({ length: totalSlices }).map((_, i) => {
            const startA = i * 60;
            const endA = startA + 60;
            const [x1, y1] = polar(startA, r);
            const [x2, y2] = polar(endA, r);
            const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 0,1 ${x2},${y2} Z`;
            
            const mid = startA + 30;
            const [dx, dy] = polar(mid, 1);
            
            const isCut = cutSlices[i];
            const transform = isCut ? `translate(${(dx - cx) * 22}, ${(dy - cy) * 22})` : undefined;

            return (
              <path
                key={i}
                d={d}
                fill={cakeColors[i]}
                stroke="#E8998D"
                strokeWidth="2"
                className={`slice ${isCut ? 'cut' : ''}`}
                transform={transform}
                onClick={() => handleCut(i)}
              />
            );
          })}
          <circle cx={cx} cy={cy} r="4" fill="#E3B23C" />
        </svg>
      </div>
      
      <p className={`cake-note ${isComplete ? 'show' : ''}`}>
        {config.cake_note_text}
      </p>
      
      <button 
        className={`next-btn ${isComplete ? 'show' : ''}`} 
        onClick={onNext}
      >
        Continue &rarr;
      </button>
    </>
  );
}
