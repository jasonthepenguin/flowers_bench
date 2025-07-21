import { checkAdmin } from '@/utils/supabase/auth/adminGuard'
import LeaderboardEditor from './LeaderboardEditor'

export default async function AdminPage() {
  // This will redirect if not admin
  await checkAdmin()
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4 text-glow">
            Admin <span className="text-neon-cyan">Panel</span>
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6 soft-glow-cyan"></div>
          <p className="text-xl text-white/70 font-light">
            Manage leaderboard entries and featured content
          </p>
        </div>

        <LeaderboardEditor />
        
      </div>
    </div>
  )
}