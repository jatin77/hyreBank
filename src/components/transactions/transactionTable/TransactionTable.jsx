import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";

import Search from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../../redux/user/user.selector";
const tableIcons = {
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};
const TransactionTable = ({ userData }) => {
  const [state, setState] = React.useState({});

  useEffect(() => {
    const data = userData.usersList
      .filter((user) => user.email === userData.currentUser.email)[0]
      .transactions.map((item) => {
        return {
          from: item.from,
          to: item.to,
          amount: item.amount,
          payment_type: item.payment_type,
          created_at: item.created_at,
        };
      });
    setState({
      columns: [
        { title: "From", field: "from" },
        { title: "To", field: "to" },
        { title: "Amount", field: "amount" },
        { title: "Payment Type", field: "payment_type" },
        { title: "Date", field: "created_at" },
      ],
      data: data,
    });
  }, [userData]);

  return (
    <MaterialTable
      icons={tableIcons}
      title="Editable Example"
      columns={state.columns}
      data={state.data}
    />
  );
};

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  userData: selectAllUserData,
});

export default connect(mapStateToProps)(TransactionTable);
