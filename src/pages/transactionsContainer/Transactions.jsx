import React from "react";
import Container from "../../components/common/dashboardLayout/DashboardLayout";
import TransactionTable from "../../components/transactions/transactionTable/TransactionTable";
import AddTransaction from "../../components/transactions/addTransaction/AddTransaction";

function Transactions() {
  return (
    <Container>
      <div className="flex">
        <AddTransaction />
        <div className="flex-grow ml-3 ">
          <TransactionTable />
        </div>
      </div>
    </Container>
  );
}

export default Transactions;
