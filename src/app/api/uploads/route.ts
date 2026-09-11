import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { nanoid } from 'nanoid';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'secret';
const BUCKET_NAME = 'photos';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 8MB)' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${nanoid(16)}.${fileExt}`;

    const { error } = await supabaseAdmin
      .storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabaseAdmin
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 201 });
  } catch (err: unknown) {
    console.error('Error uploading file:', err);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
