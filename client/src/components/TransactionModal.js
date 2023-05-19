import * as React from "react";
import Box from "@mui/material/Box";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { styles } from "./styles";

export default function TransactionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  {/* Probably have a page counter state to handle this */}
  const handleNext = () => console.log("next");
  const handlePrev = () => console.log("prev");

  return (
    <>
      <Button onClick={handleOpen}>See All Transactions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.boxInModal}>
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
              minHeight: 480,
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
              <ListItemText
                primary="Photos"
                secondary={
                  <>
                    <span>19 Jan 2023</span>
                    <br />
                    <span style={{ color: 'red' }}>-$30.00</span>
                  </>
                }
              />
              {/*Button needs an onClick to handle delete transaction from database*/}
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 16,
            }}
          >
            <Button onClick={handlePrev}>Prev</Button>
            <Button onClick={handleNext}>Next</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
