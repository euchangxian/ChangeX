import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar"
import TransactionsList from "./components/TransactionsList"
import BudgetBar from "./components/BudgetBar"

const drawerWidth = 240;

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        \
        <NavBar
          isDrawerOpen={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
        <TransactionsList />
      </Box>
      <BudgetBar />
    </>
  );
}