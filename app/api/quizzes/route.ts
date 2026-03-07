import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET() {
  try {
    const quizzes = await sql`
      SELECT id, title, slug, category, description, image_url 
      FROM quizzes 
      WHERE is_active = true 
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error('API Error (GET /api/quizzes):', error);
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}
