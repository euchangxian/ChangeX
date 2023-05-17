import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import NavBar from "./NavBar"

const drawerWidth = 240;

export default function TopBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <AppBar position="static">
      {/* Menu button */}
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // 'sm' refers to the breakpoint size corresponding to small screens
        >
          <MenuIcon />
        </IconButton>
        <NavBar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} drawerWidth={drawerWidth} />
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