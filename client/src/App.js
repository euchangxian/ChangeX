import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import TransactionsList from "./components/TransactionsList";
import BudgetBar from "./components/BudgetBar";

const drawerWidth = 240;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
          <BudgetBar />
          <TransactionsList />
        </Box>
      </Box>
    </Box>
  );
}
