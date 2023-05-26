import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BudgetBar() {
  const [userMonthlyBudget, setUserMonthlyBudget] = React.useState({
    user_id: 1,
    budget: 1500,
    startDate:"Jan",
  });
  const expenditure = 140;
  const budget = 150;
  const budgetPct = (expenditure * 100) / budget;
  const datePct = new Date().getDate() / 30;
  const onTrackPct = budgetPct / datePct;

  let progressBarColor = "primary";
  if (onTrackPct > 100) {
    progressBarColor = "error";
  }

  return (
    <Box sx={{ margin: "16px" }}>
      <Box display="flex" flexDirection="row" alignItems="center" mb={2}>
        <Box flexGrow={1}>
          <Typography variant="h4">Your budget for { userMonthlyBudget.startDate }</Typography>
        </Box>
        <Box>
          <Typography variant="h4" component="span">
            ${expenditure}
          </Typography>
          <Typography variant="body1" component="span" gutterBottom>
            /${budget}
          </Typography>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <LinearProgress
          variant="determinate"
          value={budgetPct}
          sx={{ height: 10 }}
          color={progressBarColor}
        />
      </Box>
    </Box>
  );
}
