import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "../apis/axios";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function BudgetBar({ allTransactions }) {
  const [userMonthlyBudget, setUserMonthlyBudget] = React.useState({
    user_id: 1,
    budget: 1500,
    startDate: "Jan",
  });

  const budget = 15000;
  const datePct = new Date().getDate() / 30;

  const [spending, setSpending] = React.useState([]);
  const [budgetPct, setBudgetPct] = React.useState(0);

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
        toast.error("Failed to get Spending!");
      });
  };

  React.useEffect(() => {
    fetchSpendingByMonthYear();
  }, [allTransactions]);

  return (
    <Box sx={{ margin: "16px" }}>
      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4">
            Your budget for {userMonthlyBudget.startDate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="span">
            ${spending}
          </Typography>
          <Typography variant="body1" component="span" gutterBottom>
            /${budget}
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <LinearProgress
          variant="determinate"
          value={(spending/budget) * 100}
          sx={{ height: 10 }}
          color={(100 * (spending/budget)) / datePct < 100 ? "primary" : "error"}
        />
      </Box>
    </Box>
  );
}
