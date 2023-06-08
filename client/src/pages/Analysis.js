import BudgetSpendingChart from "../components/BudgetSpendingChart";
import SpendingCategoryChart from "../components/SpendingCategoryChart";
import Insights from "../components/Insights"

export default function Analysis() {
  return (
    <>
      <BudgetSpendingChart />
      <SpendingCategoryChart />
      <Insights />
    </>
  );
}
