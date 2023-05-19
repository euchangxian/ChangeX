import { useState } from "react";
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import LockIcon from '@mui/icons-material/Lock';

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

const formStyle = {

}

const form = (
  <Box
    component="form"
    noValidate
    autoComplete="off"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: 320
    }}
  >
    <LockIcon fontSize='large' />
    <Typography align="center" variant="h5">Sign in</Typography>
    <TextField
      margin="normal"
      required
      fullWidth
      id="outlined-required"
      label="E-Mail Address"
      variant="filled"
      sx={{ mx: 'auto' }}
    />
    <TextField
      margin="normal"
      required
      fullWidth
      id="outlined-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
    />
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
    >
      Sign In
    </Button>
  </Box>
);


export default function AuthModal(props) {
  const isAuthModalOpen = props.isAuthModalOpen;
  const handleAuthButtonClick = props.handleAuthButtonClick;

  const [tabIndex, setTabIndex] = useState(0);

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
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </TabList>
          </Box>
          <TabPanel value={0}>{form}</TabPanel>
          <TabPanel value={1}>{form}</TabPanel>
        </TabContext>
      </Box>
    </Modal >
  );
}