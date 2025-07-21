import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { checkAdmin } from '@/utils/supabase/auth/adminGuard'

// GET - Fetch all leaderboard entries
export async function GET() {
  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('leaderboards')
      .select('*')
      .order('score', { ascending: false })

    if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Create new leaderboard entry
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { model_name, score, organization } = body

    // Validate input
    if (!model_name || score === undefined || !organization) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate score is a number
    const scoreNum = parseFloat(score)
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      return NextResponse.json({ error: 'Score must be a number between 0 and 100' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase
      .from('leaderboards')
      .insert([{ 
        model_name: model_name.trim(), 
        score: scoreNum, 
        organization: organization.trim() 
      }])
      .select()

    if (error) {
      console.error('Error creating entry:', error)
      return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Delete leaderboard entry
export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const isAdmin = await checkAdmin(true)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing entry ID' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error } = await supabase
      .from('leaderboards')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting entry:', error)
      return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}