// components/RegistrationForm.js
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const RegistrationForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, name);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;