import React from 'react';
import StoryController from '@/components/StoryController';
import type { PageConfig } from '@/lib/types';

export default function Home() {
  const config: PageConfig = {
    recipient_name: 'Divyanshi',
    eyebrow_text: 'A little late, but from the heart',
    headline_text: 'Happy Birthday',
    subline_text: 'Tap the balloons',
    balloon_colors: ['#E8998D', '#E3B23C', '#A9C6AD', '#E8998D'],
    balloon_count: 4,
    photos_heading: 'A few memories 📸',
    photos_subtext: 'Swipe through',
    message_heading: 'Happiest Birthday, Divyanshi 🎂',
    message_signoff: 'Radhey Radhey 🙏🏻',
    cake_heading: 'Cut the cake 🎂',
    cake_subtext: 'Tap each slice',
    cake_note_text: 'One slice, my treat 🍰',
    cake_colors: ['#FFF1E6', '#FFE7D6'],
    closing_intro_heading: 'Yrr ab toh hass de 😄',
    closing_intro_sub: 'ek smile toh banta hai na...',
    closing_reveal_heading: 'Yeah 🥳🎉',
    closing_reveal_text: 'now, just keep this smile on your face and be charming as always ☺️',
    photos: [
      { url: '/photos/photo1.jpg' },
      { url: '/photos/photo2.jpg' },
      { url: '/photos/photo3.jpg' },
      { url: '/photos/photo4.jpg' }
    ],
    paragraphs: [
      { content: 'Hii, I know birthday gaye kaafi time ho gaya hai, but woh kya hai na, uss time kuch dena bhool gaya tha… so abhi hi sahi 😅' },
      { content: 'So, Happiest Birthday Divyanshi, Gunnu, Momo etc. 🫶🏻 May you achieve everything that you want and may you always stay happy.' },
      { content: 'And I just wanted to tell you ki itna stress mat liya kar kisi cheez ka. You are the best yrr, itna bura mat socha kar apne baare mein. I genuinely believe in you — ki tu sab kuch kar legi, you can achieve everything, and you can live your life to the fullest.' },
      { content: 'Bas faltu ka zyada mat socha kar, be bakchod jaise tu pehle hua karti thi. 😂' },
      { content: 'And I just wanted to tell you ki yrr, kabhi bhi tujhe aisa lage ki tu alone hai, just remember that you have a friend by your side. Tu kuch share karegi toh mujhe bhi achha feel hoga, and isi bahane mujhe bhi koi mil jayega jise main apna bata sakun. So just chill, aur apni medicines ka dhyaan rakh. 😭' },
      { content: 'Baaki toh bahut kuch hai abhi likhne ko, but woh sab likhne baithunga toh ye birthday message nahi, novel ban jayega. 😂' },
      { content: 'Aur sunna ho toh I am just one call away. Kuch bhi zarurat pade, kuch help chahiye ho, just let me know. I am here.' },
      { content: 'Now chill, smile kar, overthink mat kar aur dhyaan rakh apna.' }
    ]
  };

  return <StoryController config={config} />;
}
