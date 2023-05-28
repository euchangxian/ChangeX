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
import ListSubheader from "@mui/material/ListSubheader";
import TransactionModal from "./TransactionModal";
import NewTransactionModal from "./NewTransactionModal";

export default function TransactionsList() {
  const handleAddNewTransaction = () => {
    console.log("hello wolrd");
  };

  const [allTransactions, setAllTransactions] = React.useState([
    {
      userID: "1",
      amount: 30,
      category: "Entertainment",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
    {
      userID: "1",
      amount: 20,
      category: "Work",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
    {
      userID: "1",
      amount: 30,
      category: "Vacation",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
    {
      userID: "1",
      amount: 30,
      category: "Entertainment",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
    {
      userID: "1",
      amount: 20,
      category: "Work",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
    {
      userID: "1",
      amount: 30,
      category: "Vacation",
      date: "19 Jan 2023",
      description: "Fifty Fifty concert tickets",
    },
  ]);

  const firstFiveTransactions = allTransactions
    .slice(0, 5)
    .map((transaction) => (
      <>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {transaction.category === "Entertainment" && <ImageIcon />}
              {transaction.category === "Work" && <WorkIcon />}
              {transaction.category === "Vacation" && <BeachAccessIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={transaction.description}
            secondary={transaction.date}
          />
          <ListItemText
            primaryTypographyProps={{
              style: { color: "red", textAlign: "right" },
            }}
            primary={`-$${transaction.amount.toFixed(2)}`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    ));

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
        <NewTransactionModal />
      </ListItem>
      {/*The following will require input from a database and should be show through a function. But I will leave them here for now*/}
      {firstFiveTransactions}
      <ListItem sx={{ justifyContent: "center" }}>
        <TransactionModal />
      </ListItem>
    </List>
  );
}
