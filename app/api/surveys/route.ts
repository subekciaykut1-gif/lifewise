import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'sidebar';

  try {
    const activeSurveys = await sql`
      SELECT id, question 
      FROM surveys 
      WHERE is_active = true AND type = ${type}
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    if (activeSurveys.length === 0) {
      return NextResponse.json({ survey: null });
    }

    const survey = activeSurveys[0];
    const options = await sql`
      SELECT id, label, vote_count 
      FROM survey_options 
      WHERE survey_id = ${survey.id}
    `;

    return NextResponse.json({ 
      survey: {
        id: survey.id,
        question: survey.question,
        options: options.map(o => ({
          id: o.id,
          label: o.label,
          votes: o.vote_count
        }))
      }
    });

  } catch (error) {
    console.error('API Error (GET /api/surveys):', error);
    return NextResponse.json({ error: 'Failed to fetch survey' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { surveyId, optionId } = await request.json();

    if (!surveyId || !optionId) {
      return NextResponse.json({ error: 'Missing surveyId or optionId' }, { status: 400 });
    }

    // Increment vote count for the selected option
    await sql`
      UPDATE survey_options 
      SET vote_count = vote_count + 1 
      WHERE id = ${optionId} AND survey_id = ${surveyId}
    `;

    // Fetch updated results to show live feedback
    const updatedOptions = await sql`
      SELECT id, label, vote_count 
      FROM survey_options 
      WHERE survey_id = ${surveyId}
    `;

    return NextResponse.json({ 
      success: true,
      options: updatedOptions.map(o => ({
        id: o.id,
        label: o.label,
        votes: o.vote_count
      }))
    });

  } catch (error) {
    console.error('API Error (POST /api/surveys):', error);
    return NextResponse.json({ error: 'Failed to record vote' }, { status: 500 });
  }
}
