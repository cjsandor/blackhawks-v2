//pages/_app.js

import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import ForcePasswordChange from '../components/ForcePasswordChange'
import { createClient } from '../lib/supabase'
import { useRouter } from 'next/router'

const theme = createTheme({
  palette: {
    primary: {
      main: '#CF0A2C', // Chicago Blackhawks red
    },
    secondary: {
      main: '#000000', // Black
    },
  },
});

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createClient())
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [forcePasswordChange, setForcePasswordChange] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        await handleAuthChange(event, session)
      }
    )

    checkSession()

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabaseClient])

  const checkSession = async () => {
    const { data: { session } } = await supabaseClient.auth.getSession()
    setSession(session)
    if (session?.user?.user_metadata?.force_password_change) {
      setForcePasswordChange(true)
    } else {
      setForcePasswordChange(false)
    }
    setIsLoading(false)
  }

  const handleAuthChange = async (event, session) => {
    if (session?.user?.user_metadata?.force_password_change) {
      setForcePasswordChange(true);
    } else {
      setForcePasswordChange(false);
      if (event === 'SIGNED_IN' && router.pathname === '/login') {
        router.push('/home');
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!session) {
    return (
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={null}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionContextProvider>
    )
  }

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {forcePasswordChange ? (
          <ForcePasswordChange />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </SessionContextProvider>
  )
}

export default MyApp