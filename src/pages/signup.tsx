import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  return (
    <Container>
      <Box onSubmit={handleSubmit} component="form" >
        <Typography variant="h3" component="div" gutterBottom>Signup</Typography>
        <Grid container direction={"column"} rowSpacing={2}>
          <Grid item>
            <TextField
              required
              helperText="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>
          <Grid item >
            <TextField
              required
              helperText="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="on"
            />
          </Grid>

          <Grid item >
            <TextField
              required
              type="text"
              helperText="Display name"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
            <Grid item >
              {<Button type="submit" disabled={isPending} variant="contained">Signup</Button>}
            </Grid>
          </Grid>
          {error && <p>{error}</p>}
        </Grid >
      </Box >
    </Container>
  );
}