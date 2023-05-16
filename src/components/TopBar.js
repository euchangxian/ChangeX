import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import NavBar from "./NavBar"

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavBar />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChangeX
        </Typography>
        {/* Login button */}
        <Button variant="outlined" color="inherit" startIcon={<LoginIcon />} sx={{ mr: "16%" }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}