import { useState } from "react";
import { Box, Typography, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // Logic to handle show/hide password.
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post("http://localhost:5050/signup", {
      username: username,
      password: password
    }, { withCredentials: true, });
    setPassword("");
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
      onSubmit={handleSubmit}
    >
      <Typography align="center" variant="h3" sx={{ padding: 3, color: "" }}>ChangeX</Typography>
      <LockIcon fontSize='large' />
      <Typography align="center" variant="h5">Sign Up</Typography>
      {/* Username text field.*/}
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="User Name"
        placeholder="e.g. Axelly"
        variant="filled"
        sx={{ mx: 'auto' }}
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        value={password}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      <Link to="/login">
        {"Already have an account? Log in"}
      </Link>
    </Box>
  );
}