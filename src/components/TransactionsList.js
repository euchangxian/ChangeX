import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ListSubheader from '@mui/material/ListSubheader';
import TransactionModalButton from "./TransactionModalButton";

export default function TransactionsList() {
  const redAndRightAlignedText = {
    color: "red",
    textAlign: "right",
  };
  const handleAddNewTransaction = () => {
    console.log("hello wolrd");
  };
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      subheader={
        <ListSubheader
          component="div"
          id="list-header"
          sx={{ fontSize: "28px", color: "black" }}
        >
          Latest Transactions
        </ListSubheader>
      }
    >
      <ListItem>
        <ListItemButton onClick={handleAddNewTransaction}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add New Transaction" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <TransactionModalButton />
      </ListItem>
      {/*The following will require input from a database and should be show through a function. But I will leave them here for now*/}
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
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
        <ListItemText
          primaryTypographyProps={{ style: redAndRightAlignedText }}
          primary="-$30.00"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
        <ListItemText
          primaryTypographyProps={{ style: redAndRightAlignedText }}
          primary="-$30.00"
        />
      </ListItem>
    </List>
  );
}
