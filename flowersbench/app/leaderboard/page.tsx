// app/leaderboard/page.tsx

import { Trophy, Medal, Award } from 'lucide-react'
import { headers } from 'next/headers';

// Add caching
export const revalidate = 60

interface LeaderboardEntry {
  id: string;
  model_name: string;
  organization: string;
  score: number;
}

async function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  try {
    // For server-side rendering, we need to construct the full URL
    const host = (await headers()).get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_BASE_URL || '';
    
    const response = await fetch(`${baseUrl}/api/leaderboard`, {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    
    const data = await response.json();
    return data.entries || [];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="h-6 w-6 text-yellow-400" />
    case 2:
      return <Medal className="h-6 w-6 text-gray-300" />
    case 3:
      return <Award className="h-6 w-6 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-white/60">#{rank}</span>
  }
}

function getScoreColor(score: number) {
  if (score >= 90) return 'text-neon-cyan'
  if (score >= 80) return 'text-neon-purple'
  if (score >= 70) return 'text-neon-pink'
  return 'text-white/80'
}

export default async function Leaderboard() {
  const entries = await getLeaderboardEntries();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-glow">
            Leader<span className="text-neon-pink">board</span>
          </h1>
          <p className="text-xl text-white/70 font-light">
            Current AI model rankings based on comprehensive evaluation
          </p>
        </div>

        {/* Leaderboard */}
        {entries && entries.length > 0 ? (
          <div className="glass rounded-2xl overflow-hidden soft-glow">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-white/80 font-medium text-sm uppercase tracking-wider">Rank</th>
                    <th className="text-left p-4 text-white/80 font-medium text-sm uppercase tracking-wider">Model</th>
                    <th className="text-left p-4 text-white/80 font-medium text-sm uppercase tracking-wider">Organization</th>
                    <th className="text-center p-4 text-white/80 font-medium text-sm uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => {
                    const rank = index + 1
                    const isTopThree = rank <= 3
                    
                    return (
                      <tr 
                        key={entry.id} 
                        className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                              isTopThree ? 'glass' : ''
                            }`}>
                              {getRankIcon(rank)}
                            </div>
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <div className="font-medium text-white">
                            {entry.model_name}
                          </div>
                        </td>
                        
                        <td className="p-4">
                          <div className="text-white/70 text-sm">
                            {entry.organization}
                          </div>
                        </td>
                        
                        <td className="p-4 text-center">
                          <span className={`text-lg font-bold ${getScoreColor(entry.score)}`}>
                            {entry.score.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center soft-glow">
            <h3 className="text-2xl font-semibold text-white mb-4">
              No Models Yet
            </h3>
            <p className="text-white/70 font-light">
              The leaderboard is currently empty. Check back soon for AI model rankings!
            </p>
          </div>
        )}

      </div>
    </div>
  )
}