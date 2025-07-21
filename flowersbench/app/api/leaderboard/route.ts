import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic';
// Cache for 1 minute on CDN
export const revalidate = 60;

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: entries, error } = await supabase
      .from('leaderboards')
      .select('*')
      .order('score', { ascending: false })
    
    if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard' }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { entries: entries || [] },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
        },
      }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}