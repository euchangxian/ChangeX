import { useState, useEffect } from "react";
import axios from "../apis/axios";
import {
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListSubheader,
  ListItemText,
} from "@mui/material";
import { Add, Search } from "@mui/icons-material";

export default function FindFriends() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/getallusers");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users
    .filter((user) => user.username.toLowerCase().includes(searchTerm))
    .slice(0, 5);

  const displayedUsers = filteredUsers.map((user) => (
    <div key={user._id}>
      <ListItem>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary={user.username} />
        <IconButton aria-label="add friend">
          <Add />
        </IconButton>
      </ListItem>
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
          Add Friends
        </ListSubheader>
      }
    >
      <div style={{ display: "flex", alignItems: "center", width: "90%" }}>
        <TextField
          type="text"
          placeholder="Search by username"
          onChange={handleSearch}
          fullWidth
        />
        <IconButton>
          <Search />
        </IconButton>
      </div>
      {displayedUsers}
    </List>
  );
}
