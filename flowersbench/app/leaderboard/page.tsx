// app/leaderboard/page.tsx

import { createClient } from '@/utils/supabase/server'
import { Trophy, Medal, Award } from 'lucide-react'

// Add caching
export const revalidate = 60

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
  const supabase = await createClient()
  
  const { data: entries } = await supabase
    .from('leaderboards')
    .select('*')
    .order('score', { ascending: false })

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-glow">
            Leader<span className="text-neon-cyan">board</span>
          </h1>
          <p className="text-xl text-white/70 font-light">
            Current AI model rankings based on comprehensive evaluation
          </p>
        </div>

        {/* Leaderboard */}
        {entries && entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const rank = index + 1
              const isTopThree = rank <= 3
              
              return (
                <div 
                  key={entry.id} 
                  className={`glass glass-hover rounded-2xl p-6 transition-all duration-300 ${
                    isTopThree ? 'soft-glow-cyan' : 'soft-glow'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    
                    {/* Rank and Model */}
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl glass">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold text-white truncate">
                          {entry.model_name}
                        </h3>
                        <p className="text-white/60 text-sm font-medium">
                          {entry.organization}
                        </p>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${getScoreColor(entry.score)} text-glow`}>
                        {entry.score.toFixed(1)}
                      </div>
                      <div className="text-white/50 text-sm font-medium">
                        Score
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000 ease-out"
                        style={{ width: `${entry.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center soft-glow">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              No Models Yet
            </h3>
            <p className="text-white/70 font-light">
              The leaderboard is currently empty. Check back soon for AI model rankings!
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 glass rounded-2xl p-8 soft-glow">
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">
            How We Rank Models
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-neon-cyan text-lg font-semibold mb-2">Performance</div>
              <p className="text-white/70 text-sm">Accuracy and speed across various tasks</p>
            </div>
            <div>
              <div className="text-neon-purple text-lg font-semibold mb-2">Ethics</div>
              <p className="text-white/70 text-sm">Safety measures and bias mitigation</p>
            </div>
            <div>
              <div className="text-neon-pink text-lg font-semibold mb-2">Innovation</div>
              <p className="text-white/70 text-sm">Novel capabilities and improvements</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}