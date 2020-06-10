import React from "react";
import Container from "../../components/common/dashboardLayout/DashboardLayout";
import AddCapital from "../../components/capital/addCapital/AddCapital";
import CapitalTable from "../../components/capital/capitalTable/CapitalTable";

function Capital() {
  return (
    <Container>
      <div className="flex">
        <AddCapital />
        <div className="flex-grow ml-3 ">
          <CapitalTable />
        </div>
      </div>
    </Container>
  );
}

export default Capital;
