import { useState } from "react";
import TransactionsList from "../components/TransactionsList";
import BudgetBar from "../components/BudgetBar";
import BudgetSpendingChart from "../components/BudgetSpendingChart";

export default function Home() {
  const [allTransactions, setAllTransactions] = useState([]);
  return (
    <>
      <BudgetBar allTransactions={allTransactions} />
      <TransactionsList
        allTransactions={allTransactions}
        setAllTransactions={setAllTransactions}
      />
      <BudgetSpendingChart />
    </>
  );
}
