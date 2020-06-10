import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectAllUserData } from "../../../redux/user/user.selector";

const PrivateRoute = ({ component: Component, userData, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userData.isAuthenticated) {
          return <Redirect to="/auth" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

// Fetch Global/Redux States
const mapStateToProps = createStructuredSelector({
  userData: selectAllUserData,
});

export default connect(mapStateToProps)(PrivateRoute);
