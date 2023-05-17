import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 600,
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

export default function TransactionModalButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const redAndRightAlignedText = {
    color: "red",
    textAlign: "right",
  };

  return (
    <>
      <Button onClick={handleOpen}>See All Transactions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/*Box in modal*/}
        <Box sx={style}>
          <IconButton
            aria-label="delete"
            onClick={handleClose}
            sx={{ marginLeft: "auto", marginTop: "-16px" }}
          >
            <CloseIcon />
          </IconButton>
          {/*List will show up to 10 transactions at a time. Can view prev/next 10 by clicking button*/}
          <List
            sx={{
              width: "100%",
              maxWidth: 400,
              bgcolor: "background.paper",
            }}
            subheader={
              <ListSubheader
                component="div"
                id="list-header"
                sx={{ fontSize: "28px", color: "black" }}
              >
                All Transactions
              </ListSubheader>
            }
          >
            {/*Will require a function to read transactions from database and show first 10*/}
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              <ListItemText
                primaryTypographyProps={{ style: redAndRightAlignedText }}
                primary="-$30.00"
              />
              {/*Button needs an onClick to handle delete transaction from database*/}
              <IconButton
                aria-label="delete"
                sx={{ marginLeft: "auto", marginTop: "-16px" }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
          {/*Will require a next page/ prev page button*/}
        </Box>
      </Modal>
    </>
  );
}
