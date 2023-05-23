import TransactionsList from "../components/TransactionsList";
import BudgetBar from "../components/BudgetBar";

export default function Home() {
    return (
      <>
        <BudgetBar />
        <TransactionsList />
      </>
    );
}