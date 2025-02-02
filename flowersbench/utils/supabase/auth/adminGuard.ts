import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

// utils/supabase/auth/adminGuard.ts

export async function checkAdmin(isApiRoute = false) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    if (isApiRoute) {
      return { isAdmin: false };
    }
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) {
    if (isApiRoute) {
      return { isAdmin: false };
    }
    redirect('/unauthorized')
  }

  return { isAdmin: true };
}