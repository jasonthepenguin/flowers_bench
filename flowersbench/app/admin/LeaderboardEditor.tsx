'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2, Edit3, Twitter } from 'lucide-react'

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
    <div className="space-y-12">
      
      {/* Error Alert */}
      {error && (
        <div className="glass rounded-2xl p-4 border border-red-500/30 soft-glow">
          <div className="text-red-400 font-medium">{error}</div>
        </div>
      )}

      {/* Add New Entry Section */}
      <div className="glass rounded-2xl p-8 soft-glow">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="h-6 w-6 text-neon-cyan" />
          <h2 className="text-2xl font-semibold text-white">Add New Model</h2>
        </div>
        
        <form onSubmit={addEntry} className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Model Name</label>
            <input
              type="text"
              placeholder="GPT-4, Claude-3, etc."
              value={newEntry.model_name}
              onChange={(e) => setNewEntry({...newEntry, model_name: e.target.value})}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-cyan focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Score (0-100)</label>
            <input
              type="number"
              placeholder="85.5"
              value={newEntry.score}
              onChange={(e) => setNewEntry({...newEntry, score: e.target.value})}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-cyan focus:outline-none transition-colors"
              min="0"
              max="100"
              step="0.1"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Organization</label>
            <input
              type="text"
              placeholder="OpenAI, Anthropic, etc."
              value={newEntry.organization}
              onChange={(e) => setNewEntry({...newEntry, organization: e.target.value})}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-cyan focus:outline-none transition-colors"
              required
            />
          </div>
          
          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading}
              className="neon-button text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Adding...' : 'Add Model'}
            </button>
          </div>
        </form>
      </div>

      {/* Current Entries */}
      <div className="glass rounded-2xl p-8 soft-glow">
        <div className="flex items-center gap-3 mb-6">
          <Edit3 className="h-6 w-6 text-neon-purple" />
          <h2 className="text-2xl font-semibold text-white">Current Entries</h2>
        </div>
        
        <div className="space-y-3">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-white/60 font-light">No entries yet</p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div key={entry.id} className="glass-hover rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg glass text-white/60 font-bold">
                      #{index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {entry.model_name}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {entry.organization} • Score: {entry.score.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="glass-hover p-3 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Featured Tweet Management */}
      <div className="glass rounded-2xl p-8 soft-glow">
        <div className="flex items-center gap-3 mb-6">
          <Twitter className="h-6 w-6 text-neon-pink" />
          <h2 className="text-2xl font-semibold text-white">Featured Tweet</h2>
        </div>
        
        <form onSubmit={addTweet} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Tweet URL or ID</label>
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
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-neon-pink focus:outline-none transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="neon-button-secondary text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Featured Tweet'}
          </button>
        </form>

        {currentTweet && (
          <div className="glass-hover rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Currently Featured</h3>
                <p className="text-neon-pink font-mono text-sm mb-1">
                  Tweet ID: {currentTweet.tweet_id}
                </p>
                <p className="text-white/60 text-sm">
                  Added: {new Date(currentTweet.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={removeFeaturedTweet}
                className="glass-hover p-3 rounded-lg text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}