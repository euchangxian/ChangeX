import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import axios from "../apis/axios";
import { useNavigate } from "react-router-dom";

export default function TopBar(props) {
  const handleDrawerToggle = props.handleDrawerToggle;
  const drawerWidth = props.drawerWidth;

  const navigate = useNavigate();
  const handleLogoutButtonClick = async () => {
    console.log("Logging out user...");
    await axios.post(
      "/logout"
    ).then(res => {
      console.log("User logged out successfully!");
      navigate("/");
    });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChangeX
        </Typography>
        {/* Log out button */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LoginIcon />}
          onClick={handleLogoutButtonClick}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}