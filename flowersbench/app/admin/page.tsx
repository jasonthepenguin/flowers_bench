import { checkAdmin } from '@/utils/supabase/auth/adminGuard'
import LeaderboardEditor from './LeaderboardEditor'

export default async function AdminPage() {
  // This will redirect if not admin
  await checkAdmin()
  
  return <LeaderboardEditor />
}