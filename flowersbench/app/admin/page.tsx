import { checkAdmin } from '@/utils/supabase/auth/adminGuard'
import LeaderboardEditor from './LeaderboardEditor'

export default async function AdminDashboard() {
  // This will redirect if not an admin
  await checkAdmin()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <LeaderboardEditor />
    </div>
  )
}