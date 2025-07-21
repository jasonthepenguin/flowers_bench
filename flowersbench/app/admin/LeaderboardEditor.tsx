'use client'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Add new states for tweets
  const [currentTweet, setCurrentTweet] = useState<TweetEntry | null>(null)
  const [newTweet, setNewTweet] = useState<NewTweetEntry>({
    tweet_id: ''
  })

  const fetchEntries = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch('/api/admin/leaderboard')
      if (!response.ok) {
        throw new Error('Failed to fetch entries')
      }
      const data = await response.json()
      setEntries(data)
    } catch (err) {
      setError('Failed to load leaderboard entries')
      console.error('Error fetching entries:', err)
    }
  }, [])

  const fetchCurrentTweet = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/featured-tweet')
      if (!response.ok) {
        throw new Error('Failed to fetch featured tweet')
      }
      const data = await response.json()
      setCurrentTweet(data)
    } catch (err) {
      console.error('Error fetching featured tweet:', err)
    }
  }, [])

  useEffect(() => {
    fetchEntries()
    fetchCurrentTweet()
  }, [fetchEntries, fetchCurrentTweet])

  async function addEntry(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model_name: newEntry.model_name,
          score: newEntry.score,
          organization: newEntry.organization
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add entry')
      }

      setNewEntry({ model_name: '', score: '', organization: '' })
      fetchEntries()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add entry')
    } finally {
      setLoading(false)
    }
  }

  async function deleteEntry(id: string) {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return
    }

    setError(null)
    try {
      const response = await fetch(`/api/admin/leaderboard?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete entry')
      }

      fetchEntries()
    } catch (err) {
      setError('Failed to delete entry')
      console.error('Error deleting entry:', err)
    }
  }

  async function addTweet(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/featured-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tweet_id: newTweet.tweet_id
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update featured tweet')
      }

      setNewTweet({ tweet_id: '' })
      fetchCurrentTweet()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update featured tweet')
    } finally {
      setLoading(false)
    }
  }

  async function removeFeaturedTweet() {
    if (!confirm('Are you sure you want to remove the featured tweet?')) {
      return
    }

    setError(null)
    try {
      const response = await fetch('/api/admin/featured-tweet', {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to remove featured tweet')
      }

      setCurrentTweet(null)
    } catch (err) {
      setError('Failed to remove featured tweet')
      console.error('Error removing featured tweet:', err)
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-md text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={addEntry} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={newEntry.model_name}
          onChange={(e) => setNewEntry({...newEntry, model_name: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
          required
        />
        <input
          type="number"
          placeholder="Score (0-100)"
          value={newEntry.score}
          onChange={(e) => setNewEntry({...newEntry, score: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
          min="0"
          max="100"
          step="0.1"
          required
        />
        <input
          type="text"
          placeholder="Organization"
          value={newEntry.organization}
          onChange={(e) => setNewEntry({...newEntry, organization: e.target.value})}
          className="block w-full px-3 py-2 border border-zinc-700 rounded-md bg-zinc-900 text-white placeholder-zinc-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Entry'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Current Entries</h2>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-zinc-400">No entries yet</p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center p-4 border border-zinc-700 rounded-md">
                <div>
                  <p className="font-bold">{entry.model_name}</p>
                  <p>Score: {entry.score.toFixed(1)}</p>
                  <p>Organization: {entry.organization}</p>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))
          )}
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
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Featured Tweet'}
          </button>
        </form>

        {currentTweet && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Currently Featured:</h3>
            <div className="p-4 border border-zinc-700 rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold">Tweet ID: {currentTweet.tweet_id}</p>
                <p className="text-sm text-zinc-400">
                  Added: {new Date(currentTweet.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={removeFeaturedTweet}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}