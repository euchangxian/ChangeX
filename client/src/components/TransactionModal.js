import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import axios from "../apis/axios";
import dayjs from "dayjs";

export default function TransactionModal({ allTransactions, fetchTransactions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteTransaction = async (id) => {
    await axios.delete(
      `/transactions/${id}`
    ).then(res => {
      fetchTransactions();
    });
  };

  const allTransactionsDisplay = allTransactions.map((transaction) => (
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
          secondary={
            <>
              <span>{dayjs(transaction.date).format("ddd, DD MMM YYYY")}</span>
              <br />
              <span style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                {`${transaction.amount < 0 ? '-' : ''}$${Math.abs(transaction.amount)}`}
              </span>
            </>
          }
        />
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => handleDeleteTransaction(transaction._id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </div>
  ));

  return (
    <>
      <Button onClick={handleOpen}>See All Transactions</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Transaction-Modal"
        aria-describedby="Shows-a-list-of-all-transactions-made-by-the-user"
      >
        <Box
          sx={{
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
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginTop: -20 }}>
            <h2 style={{ flexGrow: 1 }}>All Transactions</h2>
            <IconButton
              aria-label="delete"
              onClick={handleClose}
              sx={{
                marginLeft: "auto",
                marginTop: "-16px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <List
            sx={{
              width: "100%",
              minHeight: 480,
              maxWidth: 400,
              bgcolor: "background.paper",
              overflowY: "auto",
            }}
          >
            {/*This shows all Transactions in a scrollable list.*/}
            {allTransactionsDisplay}
          </List>
        </Box>
      </Modal>
    </>
  );
}
