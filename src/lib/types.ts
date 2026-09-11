export type PageConfig = {
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
  photos: {
    url: string;
    caption?: string;
  }[];
  paragraphs: {
    content: string;
  }[];
};
