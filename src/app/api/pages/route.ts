import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { nanoid } from 'nanoid';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'secret';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { photos, paragraphs, ...pageData } = body;

    // Retry slug generation logic
    let slug = nanoid(12);
    let attempts = 0;
    while (attempts < 3) {
      const { data: existing } = await supabaseAdmin
        .from('pages')
        .select('id')
        .eq('slug', slug)
        .single();
        
      if (!existing) break;
      slug = nanoid(12);
      attempts++;
    }

    if (attempts === 3) {
      return NextResponse.json({ error: 'Failed to generate unique slug' }, { status: 500 });
    }

    pageData.slug = slug;

    // Insert Page
    const { data: page, error: pageError } = await supabaseAdmin
      .from('pages')
      .insert(pageData)
      .select('id, slug')
      .single();

    if (pageError) throw pageError;

    // Insert Photos
    if (photos && Array.isArray(photos)) {
      const photoRecords = photos.map((p: { url: string; caption?: string }, i: number) => ({
        page_id: page.id,
        url: p.url,
        caption: p.caption,
        sort_order: i
      }));
      if (photoRecords.length > 0) {
        await supabaseAdmin.from('page_photos').insert(photoRecords);
      }
    }

    // Insert Paragraphs
    if (paragraphs && Array.isArray(paragraphs)) {
      const paragraphRecords = paragraphs.map((p: string, i: number) => ({
        page_id: page.id,
        content: p,
        sort_order: i
      }));
      if (paragraphRecords.length > 0) {
        await supabaseAdmin.from('page_message_paragraphs').insert(paragraphRecords);
      }
    }

    return NextResponse.json({ slug: page.slug, url: `/p/${page.slug}` }, { status: 201 });
  } catch (err: unknown) {
    console.error('Error creating page:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
