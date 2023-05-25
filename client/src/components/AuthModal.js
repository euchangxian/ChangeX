import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  height: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AuthModal(props) {
  const isAuthModalOpen = props.isAuthModalOpen;
  const handleAuthButtonClick = props.handleAuthButtonClick;

  const [tabIndex, setTabIndex] = useState("Log In");

  const handleChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Modal
      open={isAuthModalOpen}
      onClose={handleAuthButtonClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TabList onChange={handleChange} centered variant="fullWidth">
              <Tab value="Log In" label="Log In" component={Link} to="/login" />
              <Tab value="Sign Up" label="Sign Up" component={Link} to="signup" />
            </TabList>
          </Box>
          <TabPanel value={"Log In"}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={"Sign Up"}>
            <SignUpForm />
          </TabPanel>
        </TabContext>
      </Box>
    </Modal >
  );
}