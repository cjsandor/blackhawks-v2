import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Error during login:', error);
      setError(error.message || 'An error occurred during login');
    } else if (data?.user) {
      console.log('Login successful:', data.user);
      if (data.user.user_metadata?.force_password_change) {
        router.push('/force-password-change');
      } else {
        router.push('/home');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
}