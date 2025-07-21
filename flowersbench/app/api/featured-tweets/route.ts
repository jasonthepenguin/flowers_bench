import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic';
// Cache for 5 minutes on CDN
export const revalidate = 300;

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('featured_tweets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) {
      console.error('Error fetching featured tweet:', error)
      return NextResponse.json(
        { error: 'Failed to fetch featured tweet' }, 
        { status: 500 }
      )
    }
    
    const currentTweet = data?.[0] || null
    
    return NextResponse.json(
      { tweet: currentTweet },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
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