import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "../apis/axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function BudgetBar({ allTransactions }) {
  const datePct = new Date().getDate() / 30;

  const [budget, setBudget] = React.useState(0);
  const [spending, setSpending] = React.useState([]);
  const [onTrackPct, setOnTrackPct] = React.useState(0);
  const [budgetInput, setBudgetInput] = React.useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setBudgetInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBudget = parseInt(budgetInput);
    if (!/^\d+$/.test(budgetInput) || newBudget < 1 || parseInt(budget) === newBudget) {
      // Handle the submission of invalid budget
      toast.error("Invalid budget");
    } else if (budget === 0) {
      addBudget(budgetInput);
    } else {
      updateBudget(budgetInput);
    }
  };

  const fetchSpendingByMonthYear = () => {
    const date = dayjs();
    axios
      .get(`/getspending/${date}`)
      .then((result) => {
        if (result.status == 200) {
          setSpending(-result.data);
        }
      })
      .catch((error) => {
        toast.error("Failed to get spending!");
      });
  };

  const getBudget = () => {
    const date = dayjs();
    axios
      .get(`/getbudget/${date}`)
      .then((result) => {
        if (result.status == 200) {
          setBudget(result.data.amount);
        }
      })
      .catch((error) => {
        toast.error("Failed to get budget!");
      });
  };

  const addBudget = (amount) => {
    const date = dayjs();
    axios
      .post(`/addbudget`, {
        date: date,
        amount: amount,
      })
      .then((result) => {
        getBudget();
      });
  };

  const updateBudget = (amount) => {
    const date = dayjs();
    axios
      .post(`/updatebudget/${date}`, { newAmount: amount })
      .then((result) => {
        getBudget();
      });
  };

  React.useEffect(() => {
    getBudget();
  }, []);

  React.useEffect(() => {
    fetchSpendingByMonthYear();
  }, [allTransactions]);

  React.useEffect(() => {
    setOnTrackPct((100 * (spending / budget)) / datePct);
  }, [spending, budget]);

  return (
    <Box sx={{ margin: "16px" }}>
      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            Your budget for {dayjs().format("MMMM")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="span">
            ${spending < 0 ? 0 : spending}
          </Typography>
          <Typography variant="body1" component="span" gutterBottom>
            /${budget} {spending < 0 ? "+" + -spending : null}
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <LinearProgress
          variant="determinate"
          value={(spending / budget) * 100}
          sx={{ height: 10 }}
          color={onTrackPct < 100 ? "primary" : "error"}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginTop="10px"
      >
        <Typography>
          {onTrackPct < 100
            ? "You are on track to meet you budget. Good Job!"
            : "Oh no, you are projected to exceed your budget."}
        </Typography>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={budgetInput}
            onChange={handleInputChange}
            placeholder="New Budget"
            required
          />
          <Button type="submit">Set Budget</Button>
        </form>
      </Box>
    </Box>
  );
}
