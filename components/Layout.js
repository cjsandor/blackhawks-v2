import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

const Layout = ({ children }) => {
  const router = useRouter();
  const user = useUser();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blackhawks Ticket Manager
          </Typography>
          {user && (
            <>
              <Button color="inherit" onClick={() => router.push('/home')}>Home</Button>
              <Button color="inherit" onClick={() => router.push('/attendance')}>Attendance</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
};

export default Layout;