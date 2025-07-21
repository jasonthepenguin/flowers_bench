'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { strictRatelimit } from '@/utils/rateLimit'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  // Rate limit login attempts
  const headersList = await headers()
  const forwarded = headersList.get("x-forwarded-for")
  const realIp = headersList.get("x-real-ip") 
  const ip = forwarded?.split(",")[0] || realIp || "anonymous"
  
  const { success } = await strictRatelimit.limit(ip)
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

