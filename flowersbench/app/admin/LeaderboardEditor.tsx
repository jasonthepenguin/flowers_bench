'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect, useCallback } from 'react'

// Define the type for a leaderboard entry
type LeaderboardEntry = {
  id: string
  model_name: string
  score: number
  organization: string
  created_at: string
}

// Define the type for the new entry form
type NewEntry = {
  model_name: string
  score: string
  organization: string
}

// Add Tweet type to your existing types
type TweetEntry = {
  id: string
  tweet_id: string
  created_at: string
}

type NewTweetEntry = {
  tweet_id: string
}

export default function LeaderboardEditor() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [newEntry, setNewEntry] = useState<NewEntry>({
    model_name: '',
    score: '',
    organization: ''
  })

  // Add new states for tweets
  const [currentTweet, setCurrentTweet] = useState<TweetEntry | null>(null)
  const [newTweet, setNewTweet] = useState<NewTweetEntry>({
    tweet_id: ''
  })

  const supabase = createClient()

  const fetchEntries = useCallback(async () => {
    const { data } = await supabase
      .from('leaderboards')
      .select('*')
      .order('score', { ascending: false })
    
    if (data) setEntries(data as LeaderboardEntry[])
  }, [supabase])

  const fetchCurrentTweet = useCallback(async () => {
    const { data } = await supabase
      .from('featured_tweets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (data && data.length > 0) {
      setCurrentTweet(data[0] as TweetEntry)
    } else {
      setCurrentTweet(null)
    }
  }, [supabase])

  useEffect(() => {
    fetchEntries()
    fetchCurrentTweet()
  }, [fetchEntries, fetchCurrentTweet])

  async function addEntry(e: React.FormEvent) {
    e.preventDefault()
    const { error: insertError } = await supabase
      .from('leaderboards')
      .insert([{
        model_name: newEntry.model_name,
        score: parseFloat(newEntry.score),
        organization: newEntry.organization
      }])

    if (insertError) {
      console.error('Error adding entry:', insertError);
      // Optionally add user-facing error handling
      return;
    }
    setNewEntry({ model_name: '', score: '', organization: '' })
    fetchEntries()
  }

  async function deleteEntry(id: string) {
    const { error: deleteError } = await supabase
      .from('leaderboards')
      .delete()
      .eq('id', id)

    if (!deleteError) {
      fetchEntries()
    }
  }

  async function addTweet(e: React.FormEvent) {
    e.preventDefault()
    
    // First, delete the current tweet if it exists
    if (currentTweet) {
      await supabase
        .from('featured_tweets')
        .delete()
        .eq('id', currentTweet.id)
    }

    // Then add the new tweet
    const { error: insertError } = await supabase
      .from('featured_tweets')
      .insert([{
        tweet_id: newTweet.tweet_id
      }])

    if (!insertError) {
      setNewTweet({ tweet_id: '' })
      fetchCurrentTweet()
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={addEntry} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={newEntry.model_name}
          onChange={(e) => setNewEntry({...newEntry, model_name: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
        />
        <input
          type="number"
          placeholder="Score"
          value={newEntry.score}
          onChange={(e) => setNewEntry({...newEntry, score: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
        />
        <input
          type="text"
          placeholder="Organization"
          value={newEntry.organization}
          onChange={(e) => setNewEntry({...newEntry, organization: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Entry
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Current Entries</h2>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="flex justify-between items-center p-4 border rounded-md">
              <div>
                <p className="font-bold">{entry.model_name}</p>
                <p>Score: {entry.score.toFixed(1)}</p>
                <p>Organization: {entry.organization}</p>
              </div>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tweet Management Section */}
      <div className="mt-12 pt-8 border-t border-zinc-700">
        <h2 className="text-2xl font-bold mb-4">Featured Tweet</h2>
        
        <form onSubmit={addTweet} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-zinc-400">Tweet URL or ID</label>
            <input
              type="text"
              placeholder="Paste tweet URL or ID (e.g., 1874058976184459478)"
              value={newTweet.tweet_id}
              onChange={(e) => {
                const input = e.target.value;
                // Enhanced URL parsing
                let id = input;
                if (input.includes('/status/')) {
                  // Extract ID from various Twitter/X URL formats
                  const match = input.match(/\/status\/(\d+)/);
                  id = match ? match[1] : input;
                }
                setNewTweet({ tweet_id: id });
              }}
              className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Update Featured Tweet
          </button>
        </form>

        {currentTweet && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Currently Featured:</h3>
            <div className="p-4 border border-zinc-700 rounded-md">
              <p className="font-bold">Tweet ID: {currentTweet.tweet_id}</p>
              <p className="text-sm text-zinc-400">
                Added: {new Date(currentTweet.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}