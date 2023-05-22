import { useState } from "react";
import { Box, Typography, TextField, FormControlLabel, Button, Checkbox, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";

export default function AuthForm(props) {
  const isSignIn = props.route === "/signin";
  const buttonMessage = isSignIn ? "Sign In" : "Sign Up";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Logic to handle show/hide password.
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

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
      {/* Username text field. Only shown in signup form */}
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
      {/* Email text field */}
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
      {/* Password text field */}
      <TextField
        margin="normal"
        required
        fullWidth
        id="outlined-password-input"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        variant="filled"
        onChange={e => setPassword(e.target.value)}
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }}
      />
      {/* Remember me checkbox. Only shown on Sign in forms */}
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