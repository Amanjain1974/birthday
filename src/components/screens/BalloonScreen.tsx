'use client';

import React, { useState, useEffect } from 'react';
import type { PageConfig } from '@/lib/types';
import { useConfettiBurst } from '@/hooks/useConfettiBurst';

interface Props {
  config: PageConfig;
  onNext: () => void;
}

const defaultPositions = [
  { left: '8%', top: '10%' },
  { left: '62%', top: '4%' },
  { left: '30%', top: '32%' },
  { left: '70%', top: '40%' },
  { left: '15%', top: '55%' },
  { left: '50%', top: '65%' },
];

export default function BalloonScreen({ config, onNext }: Props) {
  const { burstAt } = useConfettiBurst();
  const [poppedCount, setPoppedCount] = useState(0);
  const [poppedBalloons, setPoppedBalloons] = useState<boolean[]>([]);

  const total = Math.min(Math.max(config.balloon_count || 4, 3), 6);
  const colors = config.balloon_colors || ['#E8998D', '#E3B23C', '#A9C6AD'];

  useEffect(() => {
    setPoppedBalloons(Array(total).fill(false));
    setPoppedCount(0);
  }, [total]);

  const handlePop = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (poppedBalloons[index]) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const color = colors[index % colors.length];
    burstAt(rect, color);
    
    setPoppedBalloons((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setPoppedCount((c) => c + 1);
  };

  const isComplete = poppedCount === total;

  return (
    <>
      <div className="headline-wrap">
        <p className="eyebrow">{config.eyebrow_text}</p>
        <h1 className="headline">{config.headline_text}</h1>
        <p className="subline">{config.subline_text}</p>
      </div>
      
      <div className="balloon-field">
        {poppedBalloons.map((isPopped, i) => {
          const pos = defaultPositions[i % defaultPositions.length];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className={`balloon ${isPopped ? 'popped' : ''}`}
              style={{
                left: pos.left,
                top: pos.top,
                animationDelay: `${i * 0.4}s`
              }}
              onClick={(e) => handlePop(i, e)}
            >
              <svg viewBox="0 0 78 96" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="39" cy="36" rx="32" ry="36" fill={color} />
                <ellipse cx="28" cy="22" rx="9" ry="12" fill="rgba(255,255,255,.25)" />
                <path d="M39 72 L34 80 L44 80 Z" fill={color} />
                <line x1="39" y1="80" x2="39" y2="96" stroke="#bbb" strokeWidth="1.5" />
              </svg>
            </div>
          );
        })}
      </div>
      
      <div className="progress-dots">
        {poppedBalloons.map((_, i) => (
          <span key={i} className={i < poppedCount ? 'done' : ''} />
        ))}
      </div>
      
      <button 
        className={`next-btn ${isComplete ? 'show' : ''}`} 
        onClick={onNext}
      >
        Continue &rarr;
      </button>
    </>
  );
}
