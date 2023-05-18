import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";

export default function TopBar(props) {
  const handleDrawerToggle = props.handleDrawerToggle;
  const drawerWidth = props.drawerWidth;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* I have no idea why the Toolbar or Appbar overflows... */}
      <Toolbar sx={{ width: "80%" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }} // 'sm' refers to the breakpoint size corresponding to small screens
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChangeX
        </Typography>
        {/* Login button */}
        <Button variant="outlined" color="inherit" startIcon={<LoginIcon />}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}