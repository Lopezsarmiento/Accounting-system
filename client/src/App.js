import "./App.css";
import TransactionsList from "./components/transactionsList";

function App() {
  return (
    <div className="container">
      <h1 className="text-center">Accounting notebook</h1>
      <TransactionsList></TransactionsList>
    </div>
  );
}

export default App;
