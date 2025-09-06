import { NextResponse } from 'next/server';
import { getSafetyCircle, setSafetyCircle } from '@/lib/sos';
import { SafetyCircle } from '@/lib/sos-types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid');

  if (!fid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  try {
    const circle = await getSafetyCircle(parseInt(fid, 10));
    if (circle) {
      return NextResponse.json(circle, { status: 200 });
    } else {
      return NextResponse.json({ contacts: [] }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { fid: number; circle: SafetyCircle };
    const { fid, circle } = body;

    await setSafetyCircle(fid, circle);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}