import { useState } from "react";
import { Box, SwipeableDrawer, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Menu button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      {/* Drawer */}
      <SwipeableDrawer 
        anchor="left" 
        open={isDrawerOpen} 
        onClose={handleDrawerToggle}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <Typography variant="h6" component="div">
            Navigation Bar
          </Typography>
        </Box>
      </SwipeableDrawer>
    </>
  );
}