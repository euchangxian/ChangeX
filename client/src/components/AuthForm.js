import { useState } from "react";
import { Box, Typography, TextField, FormControlLabel, Button, Checkbox } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";

export default function AuthForm(props) {
  const isSignIn = props.route === "/signin";
  const buttonMessage = isSignIn ? "Sign In" : "Sign Up";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = isSignIn
      ? {
        email: email,
        password: password
      }
      : {
        username: username,
        email: email,
        password: password
      };

    await axios.post("http://localhost:5050" + props.route, {
      formData
    });
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 320
      }}
      action={props.route}
      method="post"
      onSubmit={handleSubmit}
    >
      <LockIcon fontSize='large' />
      <Typography align="center" variant="h5">Sign in</Typography>
      {
        !isSignIn &&
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="User Name"
          placeholder="e.g. Axelly"
          variant="filled"
          sx={{ mx: 'auto' }}
          onChange={e => setUsername(e.target.value)}
        />
      }
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="E-Mail Address"
        variant="filled"
        sx={{ mx: 'auto' }}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="filled"
        onChange={e => setPassword(e.target.value)}
      />
      {
        isSignIn &&
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
      }
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {buttonMessage}
      </Button>
    </Box>
  );
}