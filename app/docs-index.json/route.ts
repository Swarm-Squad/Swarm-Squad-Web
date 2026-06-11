import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/docs';

// Statically generated at build time — the search index is fully local.
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(buildSearchIndex());
}
