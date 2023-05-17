import { Box, SwipeableDrawer, Typography } from "@mui/material";

export default function NavBar(props) {
  const isDrawerOpen = props.isDrawerOpen;
  const setIsDrawerOpen = props.setIsDrawerOpen;
  const drawerWidth = props.drawerWidth;

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