//pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // Handle error
    } else if (data.user.user_metadata.force_password_change) {
      // Redirect to home page, where _app.js will handle the force password change
      router.push('/');
    } else {
      // Normal login flow
      router.push('/home');
    }
  };

  return (
    <Layout>
      <Box sx={{ width: '100%', maxWidth: 400, margin: 'auto', mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Login" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && <LoginForm onSubmit={handleLogin} />}
        </Box>
      </Box>
    </Layout>
  );
};

export default LoginPage;