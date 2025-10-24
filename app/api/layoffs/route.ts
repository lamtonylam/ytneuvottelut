import { NextResponse } from 'next/server';
import { db } from '@/app/lib/db';

export async function GET() {
  try {
    const allLayoffs = await db.query.layoffs.findMany({
      with: {
        company: true
      },
    });
    return NextResponse.json(allLayoffs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch layoffs' }, { status: 500 });
  }
}
