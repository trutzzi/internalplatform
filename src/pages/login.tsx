import {
  Box, Button, Container, Grid, TextField, Typography,
} from '@mui/material';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Container>
      <Grid>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h3" component="div" gutterBottom>Login</Typography>
          <Grid item>
            <TextField
              required
              helperText="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="on"
            />
          </Grid>
          <Grid item>
            <TextField
              required
              helperText="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="on"
            />
          </Grid>
          <Button type="submit" disabled={isPending} variant="contained">Login</Button>
        </Box>
      </Grid>
    </Container>
  );
}
