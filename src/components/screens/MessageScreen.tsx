'use client';

import React from 'react';
import type { PageConfig } from '@/lib/supabase';

interface Props {
  config: PageConfig;
  onNext: () => void;
  onPrev: () => void;
}

export default function MessageScreen({ config, onNext, onPrev }: Props) {
  const paragraphs = config.paragraphs || [];

  return (
    <>
      <button className="backdot" onClick={onPrev}>&larr;</button>
      <div className="card">
        <div className="icon">💌</div>
        <h2>{config.message_heading.replace('{name}', config.recipient_name)}</h2>
        <div id="messageText">
          {paragraphs.map((p, i) => (
            <p key={i}>{p.content}</p>
          ))}
        </div>
        {config.message_signoff && (
          <p className="sign">{config.message_signoff}</p>
        )}
      </div>
      <button className="next-btn show" style={{ marginTop: '22px' }} onClick={onNext}>
        Continue &rarr;
      </button>
    </>
  );
}
