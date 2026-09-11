'use client';

import React, { useState } from 'react';

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [recipient, setRecipient] = useState('');
  const [paragraphs, setParagraphs] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState('');
  const [resultLink, setResultLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Uploading photos...');
    
    try {
      const uploadedPhotos = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch('/api/uploads', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${secret}`
          },
          body: formData
        });
        
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Upload failed');
        }
        
        const data = await res.json();
        uploadedPhotos.push({ url: data.url, caption: file.name });
      }

      setStatus('Creating page...');
      
      const pageData = {
        recipient_name: recipient,
        eyebrow_text: 'A little late, but from the heart',
        headline_text: 'Happy Birthday',
        subline_text: 'Tap the balloons',
        balloon_colors: ['#E8998D','#E3B23C','#A9C6AD','#E8998D'],
        balloon_count: 4,
        photos_heading: 'A few memories \uD83D\uDCF8',
        photos_subtext: 'Swipe through',
        message_heading: 'Happiest Birthday, {name} \uD83C\uDF82',
        message_signoff: 'Radhey Radhey \uD83D\uDE4F\uD83C\uDFFB',
        cake_heading: 'Cut the cake \uD83C\uDF82',
        cake_subtext: 'Tap each slice',
        cake_note_text: 'One slice, my treat \uD83C\uDF70',
        cake_colors: ['#FFF1E6','#FFE7D6'],
        closing_intro_heading: 'Yrr ab toh hass de \uD83D\uDE04',
        closing_intro_sub: 'ek smile toh banta hai na...',
        closing_reveal_heading: 'Yeah \uD83E\uDD73\uD83C\uDF89',
        closing_reveal_text: 'now, just keep this smile on your face and be charming as always \u263A\uFE0F',
        theme: {},
        photos: uploadedPhotos,
        paragraphs: paragraphs.split('\\n\\n').filter(p => p.trim() !== '')
      };

      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secret}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pageData)
      });
      
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create page');
      }
      
      const data = await res.json();
      setStatus('Success!');
      setResultLink(data.url);
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus(`Error: ${err.message}`);
      } else {
        setStatus('An unknown error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Create a Birthday Page</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label>
          Admin Secret:<br/>
          <input type="password" required value={secret} onChange={(e) => setSecret(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </label>
        
        <label>
          Recipient Name:<br/>
          <input type="text" required value={recipient} onChange={(e) => setRecipient(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </label>
        
        <label>
          Message Paragraphs (separated by double newlines):<br/>
          <textarea required rows={10} value={paragraphs} onChange={(e) => setParagraphs(e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </label>
        
        <label>
          Photos (up to 6):<br/>
          <input type="file" multiple accept="image/*" onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 6))} style={{ width: '100%', padding: '8px' }} />
        </label>
        
        <button type="submit" style={{ padding: '12px', background: '#E8998D', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px', fontSize: '16px' }}>
          Create Page
        </button>
      </form>
      
      {status && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{status}</p>}
      
      {resultLink && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#e0ffe0', borderRadius: '8px' }}>
          <h3>Page Created!</h3>
          <p>Share this link:</p>
          <a href={resultLink} target="_blank" rel="noreferrer" style={{ fontSize: '18px', color: '#0066cc' }}>
            {window.location.origin}{resultLink}
          </a>
        </div>
      )}
    </div>
  );
}
