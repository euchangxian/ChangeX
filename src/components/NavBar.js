import { useState } from "react";
import { Box, SwipeableDrawer, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };


  // list of components to display in the drawer
  const list = (
    <Box p={2} width="250px" textAlign="center" role="presentation">
      <Typography variant="h6" component="div">
        Navigation Bar
      </Typography>
    </Box>
  );

  return (
    <>
      {/* Menu button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }} // 'sm' refers to the breakpoint size corresponding to small screens
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        variant="temporary"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {list}
      </SwipeableDrawer>

      <SwipeableDrawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {list}
      </SwipeableDrawer>
    </>
  );
}