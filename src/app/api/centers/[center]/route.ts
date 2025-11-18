import { NextResponse } from 'next/server';
import { getCenterData } from '@/lib/centers';

function simulateApiDelay(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1500);
  });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ center: string }> }
) {
  try {
    const { center: centerSlug } = await params;
    await simulateApiDelay();

    const centerData = getCenterData(centerSlug);

    if (!centerData) {
      return NextResponse.json(
        { error: 'center.centerNotExists' },
        { status: 404 }
      );
    }

    return NextResponse.json(centerData);
  } catch {
    return NextResponse.json(
      { error: 'center.errorLoading' },
      { status: 500 }
    );
  }
}

