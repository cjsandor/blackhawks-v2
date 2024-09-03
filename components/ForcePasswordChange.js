//components/ForcePasswordChange.js

import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function ForcePasswordChange() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword,
        data: { force_password_change: false }
      });

      if (error) throw error;

      // Refresh the session
      const { data, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;

      // Redirect to home page
      router.push('/home');
    } catch (error) {
      setError('Error changing password: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 1, maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>Please change your password</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Change Password
      </Button>
    </Box>
  );
}