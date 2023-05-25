import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";
import Home from "./Home";
import NoPage from "./NoPage";

const drawerWidth = 240;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* The TopBar and NavBar are always rendered */}
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <NavBar
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <TopBar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        <Box
          sx={{
            paddingTop: (theme) => theme.spacing(8),
            paddingBottom: (theme) => theme.spacing(2),
            overflowY: "auto",
          }}
        >
          {/* These are the various routes to different pages */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
