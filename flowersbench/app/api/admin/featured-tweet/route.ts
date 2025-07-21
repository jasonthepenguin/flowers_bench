import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkAdmin } from '@/utils/supabase/auth/adminGuard'
import { strictRatelimit, getClientIdentifier } from '@/utils/rateLimit'

// GET - Fetch current featured tweet
export async function GET(request: NextRequest) {
  // Rate limiting
  const ip = getClientIdentifier(request)
  const { success, limit, remaining, reset } = await strictRatelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' }, 
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        }
      }
    )
  }

  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('featured_tweets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching featured tweet:', error)
      return NextResponse.json({ error: 'Failed to fetch featured tweet' }, { status: 500 })
    }

    return NextResponse.json(data || null)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create/Update featured tweet
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIdentifier(request)
  const { success, limit, remaining, reset } = await strictRatelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' }, 
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        }
      }
    )
  }

  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { tweet_id } = body

    // Validate input
    if (!tweet_id || typeof tweet_id !== 'string') {
      return NextResponse.json({ error: 'Invalid tweet ID' }, { status: 400 })
    }

    // Extract numeric ID from Twitter URL or use as-is
    const tweetIdMatch = tweet_id.match(/status\/(\d+)/)
    const cleanTweetId = tweetIdMatch ? tweetIdMatch[1] : tweet_id.trim()

    // Validate it's a numeric ID
    if (!/^\d+$/.test(cleanTweetId)) {
      return NextResponse.json({ error: 'Tweet ID must be numeric' }, { status: 400 })
    }

    const supabase = await createClient()
    
    // Delete any existing featured tweets first
    await supabase.from('featured_tweets').delete().neq('id', '')

    // Insert new featured tweet
    const { data, error } = await supabase
      .from('featured_tweets')
      .insert([{ tweet_id: cleanTweetId }])
      .select()

    if (error) {
      console.error('Error creating featured tweet:', error)
      return NextResponse.json({ error: 'Failed to create featured tweet' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove featured tweet
export async function DELETE(request: NextRequest) {
  // Rate limiting
  const ip = getClientIdentifier(request)
  const { success, limit, remaining, reset } = await strictRatelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' }, 
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
        }
      }
    )
  }

  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('featured_tweets')
      .delete()
      .neq('id', '') // Delete all entries

    if (error) {
      console.error('Error deleting featured tweet:', error)
      return NextResponse.json({ error: 'Failed to delete featured tweet' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}