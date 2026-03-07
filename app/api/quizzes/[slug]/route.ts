import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const quizResult = await sql`
      SELECT id, title, slug, category, description, image_url 
      FROM quizzes 
      WHERE slug = ${slug} AND is_active = true AND publish_at <= NOW()
      LIMIT 1
    `;

    if (quizResult.length === 0) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    const quiz = quizResult[0];

    // Fetch questions
    const questions = await sql`
      SELECT id, text, image_url, order_index 
      FROM quiz_questions 
      WHERE quiz_id = ${quiz.id} 
      ORDER BY order_index ASC
    `;

    // Fetch options for all questions
    const questionIds = questions.map(q => q.id);
    const options = await sql`
      SELECT id, question_id, text, is_correct, explanation 
      FROM quiz_options 
      WHERE question_id = ANY(${questionIds})
    `;

    // Fetch outcomes
    const outcomes = await sql`
      SELECT id, min_score, max_score, title, description, image_url 
      FROM quiz_outcomes 
      WHERE quiz_id = ${quiz.id}
    `;

    // Map options to questions
    const questionsWithOptions = questions.map(q => ({
      ...q,
      options: options.filter(o => o.question_id === q.id)
    }));

    return NextResponse.json({ 
      quiz: {
        ...quiz,
        questions: questionsWithOptions,
        outcomes
      } 
    });

  } catch (error) {
    console.error(`API Error (GET /api/quizzes/${slug}):`, error);
    return NextResponse.json({ error: 'Failed to fetch quiz details' }, { status: 500 });
  }
}
