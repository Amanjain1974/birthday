'use client';

import React, { useState, useRef } from 'react';
import type { PageConfig } from '@/lib/supabase';
import { useConfettiBurst } from '@/hooks/useConfettiBurst';

interface Props {
  config: PageConfig;
  onPrev: () => void;
}

export default function ClosingScreen({ config, onPrev }: Props) {
  const { burstAt } = useConfettiBurst();
  const [revealed, setRevealed] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);

  const moveNoButton = (avoidX?: number, avoidY?: number) => {
    if (!stageRef.current || !noBtnRef.current) return;
    
    const stageRect = stageRef.current.getBoundingClientRect();
    const btnW = noBtnRef.current.offsetWidth;
    const btnH = noBtnRef.current.offsetHeight;
    
    const maxX = Math.max(stageRect.width - btnW, 0);
    const maxY = Math.max(stageRect.height - btnH, 0);
    
    let x = 0, y = 0, tries = 0;
    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;
      tries++;
    } while (
      avoidX !== undefined && avoidY !== undefined && tries < 8 &&
      Math.hypot((x + btnW / 2) - avoidX, (y + btnH / 2) - avoidY) < Math.max(btnW, btnH) * 1.3
    );
    
    noBtnRef.current.style.left = `${x + btnW / 2}px`;
    noBtnRef.current.style.top = `${y}px`;
  };

  const handleNoInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const checkProximity = (px: number, py: number) => {
    if (!stageRef.current || !noBtnRef.current) return;
    
    const stageRect = stageRef.current.getBoundingClientRect();
    const mx = px - stageRect.left;
    const my = py - stageRect.top;
    
    const left = parseFloat(noBtnRef.current.style.left || `${noBtnRef.current.offsetLeft}`);
    const top = parseFloat(noBtnRef.current.style.top || `${noBtnRef.current.offsetTop}`);
    
    const dist = Math.hypot(mx - left, my - top);
    if (dist < 75) {
      moveNoButton(mx, my);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    checkProximity(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      checkProximity(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleYes = () => {
    setRevealed(true);
    if (yesBtnRef.current) {
      const r = yesBtnRef.current.getBoundingClientRect();
      burstAt({ left: r.left, top: r.top, width: r.width, height: r.height } as DOMRect, '#E3B23C');
    }
  };

  return (
    <>
      <button className="backdot" onClick={onPrev}>&larr;</button>
      <span className="star" style={{ top: '16%', left: '14%', fontSize: '16px' }}>✦</span>
      <span className="star" style={{ top: '22%', right: '16%', fontSize: '12px', animationDelay: '.6s' }}>✦</span>
      <span className="star" style={{ bottom: '24%', left: '20%', fontSize: '14px', animationDelay: '1.2s' }}>✦</span>
      <span className="star" style={{ bottom: '18%', right: '14%', fontSize: '10px', animationDelay: '1.8s' }}>✦</span>

      {!revealed ? (
        <div className="closing-card" id="closingIntro">
          <h2>{config.closing_intro_heading}</h2>
          {config.closing_intro_sub && <p className="sub2">{config.closing_intro_sub}</p>}
          <div 
            className="btn-stage" 
            id="btnStage"
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            <button 
              className="opt-btn yes-btn" 
              ref={yesBtnRef}
              onClick={handleYes}
            >
              Yes
            </button>
            <button 
              className="opt-btn no-btn" 
              ref={noBtnRef}
              onMouseDown={handleNoInteraction}
              onTouchStart={handleNoInteraction}
              onClick={handleNoInteraction}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="closing-card" id="closingReveal">
          <h2>{config.closing_reveal_heading}</h2>
          {config.closing_reveal_text && (
            <p className="reveal-p">{config.closing_reveal_text}</p>
          )}
        </div>
      )}
    </>
  );
}
