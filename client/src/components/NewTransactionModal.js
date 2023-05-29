import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SavingsIcon from '@mui/icons-material/Savings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";
import axios from "../apis/axios";

export default function NewTransactionModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategory("");
    setDescription("");
    setAmount();
  };

  const [transactionType, setTransactionType] = React.useState("spendings");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [amount, setAmount] = React.useState();

  const handleTransactionType = (event, newTransactionType) => {
    if (newTransactionType != null) {
      setTransactionType(newTransactionType);
    }
  };

  const handleDecimalsOnValue = (value) => {
    const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,2})/s;
    return value.match(regex)[0];
  };

  const handleNewTransaction = async (e) => {
    console.log("helloworld");
    console.log(transactionType);
    console.log(category);
    console.log(description);
    console.log(amount);
    e.preventDefault();

    await axios.post("/newtransaction", {
      type: transactionType,
      category: category,
      description: description,
      amount: amount
    });
  };

  const categories = [
    { category: "Meals" },
    { category: "Groceries" },
    { category: "Transport" },
    { category: "Course Materials" },
    { category: "Entertainment" },
    { category: "Personal Care" },
    { category: "Clothes" },
    { category: "Gifts / Charity" },
    { category: "Others" },
  ];

  return (
    <>
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Transaction" />
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add-Transaction-Modal"
        aria-describedby="Allows-user-to-add-new-transactions-into-the-database"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 400,
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginTop: -20 }}
          >
            <h2 style={{ flexGrow: 1 }}>Add New Transaction</h2>
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
          <form onSubmit={handleNewTransaction}>
            {/* div to select whether transaction is a payment or not */}
            <div style={{ display: "flex", alignItems: "start" }}>
              <ToggleButtonGroup
                value={transactionType}
                exclusive
                onChange={handleTransactionType}
                aria-label="savings or spendings selection"
              >
                <ToggleButton value="savings" aria-label="savings">
                  <SavingsIcon />
                </ToggleButton>
                <ToggleButton value="spendings" aria-label="spendings">
                  <ShoppingCartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            {/* div to select transaction category */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "20px" }}>
                Transaction Category:
              </Typography>
              <TextField
                id="category"
                value={category}
                required
                select
                sx={{ flexGrow: 1 }}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.category} value={option.category}>
                    {option.category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {/* div to input transaction description */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "20px" }}>
                Transaction Description:
              </Typography>
              <TextField
                id="description"
                variant="outlined"
                value={description}
                required
                sx={{ flexGrow: 1 }}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
            {/* div to input amount. can only input up to 2 decimal points */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ marginRight: "20px" }}>Amount:</Typography>
              <TextField
                id="amount"
                variant="outlined"
                value={amount}
                required
                sx={{ flexGrow: 1 }}
                onChange={(event) => {
                  setAmount(handleDecimalsOnValue(event.target.value));
                }}
              />
            </div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
