'use client';

import React, { useState, useRef } from 'react';
import type { PageConfig } from '@/lib/supabase';

interface Props {
  config: PageConfig;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotoCarouselScreen({ config, onNext, onPrev }: Props) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const photos = config.photos || [];

  const handlePrev = () => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrent((c) => (c + 1) % photos.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 40) handlePrev();
    else if (diff < -40) handleNext();
  };

  return (
    <>
      <button className="backdot" onClick={onPrev}>&larr;</button>
      <div className="photo-head">
        <h2>{config.photos_heading}</h2>
        <p>{config.photos_subtext}</p>
      </div>
      
      <div className="carousel-wrap">
        <div 
          className="carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {photos.map((p, i) => (
              <div 
                key={i} 
                className="carousel-slide" 
                style={{ backgroundImage: `url('${p.url}')` }}
              >
                {!p.url && (
                  <div className="ph-placeholder">
                    <span style={{ fontSize: '34px' }}>🖼️</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{p.caption || `Photo ${i + 1}`}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {photos.length > 1 && (
            <>
              <button className="arrow left" onClick={handlePrev}>&lsaquo;</button>
              <button className="arrow right" onClick={handleNext}>&rsaquo;</button>
            </>
          )}
        </div>
        
        {photos.length > 1 && (
          <div className="dots">
            {photos.map((_, i) => (
              <span key={i} className={i === current ? 'active' : ''} />
            ))}
          </div>
        )}
      </div>
      
      <button className="next-btn show" style={{ marginTop: '20px' }} onClick={onNext}>
        Continue &rarr;
      </button>
    </>
  );
}
