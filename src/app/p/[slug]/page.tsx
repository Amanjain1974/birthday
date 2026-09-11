import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import StoryController from '@/components/StoryController';

export const revalidate = 60; // optionally cache for 60 seconds

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: page } = await supabase
    .from('pages')
    .select('recipient_name')
    .eq('slug', params.slug)
    .single();

  if (!page) return { title: 'Not Found' };
  
  return {
    title: `For You, ${page.recipient_name}`,
  };
}

export default async function ViewerPage({ params }: { params: { slug: string } }) {
  const { data: page, error } = await supabase
    .from('pages')
    .select(`
      *,
      photos:page_photos(url, caption, sort_order),
      paragraphs:page_message_paragraphs(content, sort_order)
    `)
    .eq('slug', params.slug)
    .single();

  if (error || !page) {
    return notFound();
  }

  // Sort relations
  if (page.photos) {
    page.photos.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
  }
  if (page.paragraphs) {
    page.paragraphs.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
  }

  return <StoryController config={page as unknown as import('@/lib/supabase').PageConfig} />;
}
