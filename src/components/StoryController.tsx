'use client';

import React, { useState } from 'react';
import type { PageConfig } from '@/lib/types';
import BalloonScreen from './screens/BalloonScreen';
import PhotoCarouselScreen from './screens/PhotoCarouselScreen';
import MessageScreen from './screens/MessageScreen';
import CakeScreen from './screens/CakeScreen';
import ClosingScreen from './screens/ClosingScreen';

interface Props {
  config: PageConfig;
}

export default function StoryController({ config }: Props) {
  const [activeScreen, setActiveScreen] = useState(0);

  const goTo = (index: number) => {
    setActiveScreen(index);
  };

  const getScreenClass = (index: number) => {
    if (index === activeScreen) return 'screen active';
    if (index < activeScreen) return 'screen prev';
    return 'screen';
  };

  return (
    <>
      <div className={getScreenClass(0)} id="screen-balloons">
        <BalloonScreen config={config} onNext={() => goTo(1)} />
      </div>
      <div className={getScreenClass(1)} id="screen-photos">
        <PhotoCarouselScreen config={config} onNext={() => goTo(2)} onPrev={() => goTo(0)} />
      </div>
      <div className={getScreenClass(2)} id="screen-message">
        <MessageScreen config={config} onNext={() => goTo(3)} onPrev={() => goTo(1)} />
      </div>
      <div className={getScreenClass(3)} id="screen-cake">
        <CakeScreen config={config} onNext={() => goTo(4)} onPrev={() => goTo(2)} />
      </div>
      <div className={getScreenClass(4)} id="screen-closing">
        <ClosingScreen config={config} onPrev={() => goTo(3)} />
      </div>
    </>
  );
}
