//lib/auth.js

import { createClient } from '../../lib/supabase'

export default async function handler(req, res) {
  const supabase = createClient()

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.refreshSession()
    return res.status(200).json({ message: 'Success' })
  }

  return res.status(401).json({ message: 'Not authenticated' })
}