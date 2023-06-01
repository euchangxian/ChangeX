import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import TransactionModal from "./TransactionModal";
import NewTransactionModal from "./NewTransactionModal";
import axios from "../apis/axios";
import dayjs from "dayjs";

export default function TransactionsList() {
  const [allTransactions, setAllTransactions] = React.useState([]);

  const fetchTransactions = async () => {
    await axios.get(
      "/transactions" // Possibly have to add another argument passing in page number as request parameter.
    ).then(result => {
      setAllTransactions(result.data);
    });
  }

  React.useEffect(() => {
    fetchTransactions();
  }, []);

  const firstFiveTransactions = allTransactions
    .slice(0, 5)
    .map((transaction) => (
      <div key={transaction._id}>
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
            secondary={dayjs(transaction.date).format("ddd, DD MMM YYYY")}
          />
          <ListItemText
            primaryTypographyProps={{
              style: {
                textAlign: "right",
                color: transaction.amount < 0 ? "red" : "green"
              },
            }}
            primary={`${transaction.amount < 0 ? '-' : ''}$${Math.abs(transaction.amount)}`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
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
        <TransactionModal allTransactions={allTransactions}/>
      </ListItem>
    </List>
  );
}
