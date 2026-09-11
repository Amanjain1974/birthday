create table pages (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  is_published      boolean not null default true,
  sender_name       text,
  recipient_name    text not null,
  eyebrow_text      text not null default 'A little late, but from the heart',
  headline_text     text not null default 'Happy Birthday',
  subline_text      text not null default 'Tap the balloons',
  balloon_colors    jsonb not null default '["#E8998D","#E3B23C","#A9C6AD"]',
  balloon_count     smallint not null default 4 check (balloon_count between 3 and 6),
  photos_heading    text not null default 'A few memories',
  photos_subtext    text not null default 'Swipe through',
  message_heading   text not null default 'Happiest Birthday',
  message_signoff   text,
  cake_heading      text not null default 'Cut the cake',
  cake_subtext      text not null default 'Tap each slice',
  cake_note_text    text not null default 'One slice, my treat',
  cake_colors       jsonb not null default '["#FFF1E6","#FFE7D6"]',
  closing_intro_heading  text not null default 'Yrr ab toh hass de',
  closing_intro_sub      text,
  closing_reveal_heading text not null default 'Yeah',
  closing_reveal_text    text,
  theme             jsonb not null default '{}',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create unique index idx_pages_slug on pages (slug);

create table page_photos (
  id           uuid primary key default gen_random_uuid(),
  page_id      uuid not null references pages(id) on delete cascade,
  url          text not null,
  caption      text,
  sort_order   smallint not null default 0
);
create index idx_page_photos_page_id on page_photos (page_id, sort_order);

create table page_message_paragraphs (
  id           uuid primary key default gen_random_uuid(),
  page_id      uuid not null references pages(id) on delete cascade,
  content      text not null,
  sort_order   smallint not null default 0
);
create index idx_page_paragraphs_page_id on page_message_paragraphs (page_id, sort_order);

create table page_events (
  id            uuid primary key default gen_random_uuid(),
  page_id       uuid not null references pages(id) on delete cascade,
  session_id    text not null,
  event_type    text not null check (event_type in
                   ('page_view','screen_reached','balloons_complete',
                    'cake_complete','yes_clicked')),
  screen_id     text,
  occurred_at   timestamptz not null default now(),
  user_agent    text
);
create index idx_page_events_page_id on page_events (page_id, occurred_at);
