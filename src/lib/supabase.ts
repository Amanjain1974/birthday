import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey
);

export type PageConfig = {
  id: string;
  slug: string;
  is_published: boolean;
  sender_name?: string;
  recipient_name: string;
  eyebrow_text: string;
  headline_text: string;
  subline_text: string;
  balloon_colors: string[];
  balloon_count: number;
  photos_heading: string;
  photos_subtext: string;
  message_heading: string;
  message_signoff?: string;
  cake_heading: string;
  cake_subtext: string;
  cake_note_text: string;
  cake_colors: string[];
  closing_intro_heading: string;
  closing_intro_sub?: string;
  closing_reveal_heading: string;
  closing_reveal_text?: string;
  theme: Record<string, string>;
  created_at: string;
  updated_at: string;
  photos: {
    url: string;
    caption?: string;
    sort_order: number;
  }[];
  paragraphs: {
    content: string;
    sort_order: number;
  }[];
};
