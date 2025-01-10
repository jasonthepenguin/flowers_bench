// app/benches/greentext/page.tsx
'use client'
import { useState } from 'react'

export default function GreentextBench() {
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTest = async () => {
    try {
      setIsLoading(true)
      setResponse('')
      setError('')

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelName: 'openai/gpt-3.5-turbo'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch response');
      }

      if (response.body) {
        const reader = response.body.getReader()
        let text = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = new TextDecoder().decode(value)
          text += chunk
          setResponse(text)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Greentext Bench</h1>

      <div className="space-y-6">
        <button
          onClick={handleTest}
          disabled={isLoading}
          className={`px-4 py-2 rounded font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isLoading ? 'Getting Response...' : 'Test Chat'}
        </button>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {response && (
          <div className="prose max-w-none">
            <div className="bg-white shadow rounded-lg p-6 whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}