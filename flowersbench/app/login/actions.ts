'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { authRatelimit, getClientIdentifier } from '@/utils/rateLimit'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  // Rate limit login attempts
  const headersList = await headers()
  
  // For server actions, you need to build a pseudo-request:
  const pseudoRequest = {
    headers: {
      get: (name: string) => headersList.get(name)
    }
  } as Request
  
  const ip = getClientIdentifier(pseudoRequest)
  
  const { success } = await authRatelimit.limit(ip)
  if (!success) {
    redirect('/login?error=rate-limit')
  }

  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=auth-failed')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

