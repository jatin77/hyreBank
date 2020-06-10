import React from "react";
import { Redirect } from "react-router-dom";

function ErrorRoute() {
  return <Redirect to="/auth" />;
}

export default ErrorRoute;
