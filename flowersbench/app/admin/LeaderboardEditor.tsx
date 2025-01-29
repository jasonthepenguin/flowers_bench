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

export default function LeaderboardEditor() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [newEntry, setNewEntry] = useState<NewEntry>({
    model_name: '',
    score: '',
    organization: ''
  })

  const supabase = createClient()

  const fetchEntries = useCallback(async () => {
    const { data } = await supabase
      .from('leaderboards')
      .select('*')
      .order('score', { ascending: false })
    
    if (data) setEntries(data as LeaderboardEntry[])
  }, [supabase])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  async function addEntry(e: React.FormEvent) {
    e.preventDefault()
    const { error: insertError } = await supabase
      .from('leaderboards')
      .insert([{
        model_name: newEntry.model_name,
        score: parseInt(newEntry.score),
        organization: newEntry.organization
      }])

    if (!insertError) {
      setNewEntry({ model_name: '', score: '', organization: '' })
      fetchEntries()
    }
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

  return (
    <div className="space-y-8">
      <form onSubmit={addEntry} className="space-y-4">
        <input
          type="text"
          placeholder="Model Name"
          value={newEntry.model_name}
          onChange={(e) => setNewEntry({...newEntry, model_name: e.target.value})}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Score"
          value={newEntry.score}
          onChange={(e) => setNewEntry({...newEntry, score: e.target.value})}
          className="block w-full px-3 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Organization"
          value={newEntry.organization}
          onChange={(e) => setNewEntry({...newEntry, organization: e.target.value})}
          className="block w-full px-3 py-2 border rounded-md"
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
                <p>Score: {entry.score}</p>
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
    </div>
  )
}