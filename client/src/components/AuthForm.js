import { Box, Typography, TextField, FormControlLabel, Button, Checkbox } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';

export default function AuthForm(props) {
  const formAction = props.formAction;
  const isSignIn = formAction === "signIn";

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
    >
      <LockIcon fontSize='large' />
      <Typography align="center" variant="h5">Sign in</Typography>
      {
        !isSignIn &&
        <TextField
          margin="normal"
          required
          fullWidth
          id="outlined-required"
          label="User Name"
          placeholder="e.g. Axelly"
          variant="filled"
          sx={{ mx: 'auto' }}
        />
      }
      <TextField
        margin="normal"
        required
        fullWidth
        id="outlined-required"
        label="E-Mail Address"
        variant="filled"
        sx={{ mx: 'auto' }}
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
        {formAction}
      </Button>
    </Box>
  );
}