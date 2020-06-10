import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/auth/Authentication";
import Transactions from "./pages/transactionsContainer/Transactions";
import Capital from "./pages/capitalContainer/Capital";
import PrivateRoute from "./components/utility/privateRoute/PrivateRoute";
import ErrorRoute from "./pages/errorRoutePage/ErrorRoute";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/auth" component={Authentication} />
        {/* Private Routes */}
        <PrivateRoute exact path="/" component={Transactions} />
        <PrivateRoute path="/capital" component={Capital} />
        <Route component={ErrorRoute} />
      </Switch>
    </>
  );
}

export default App;
