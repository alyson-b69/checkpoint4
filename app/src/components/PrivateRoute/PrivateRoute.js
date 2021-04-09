import React from 'react'
import { Route } from "react-router-dom";
import { Redirect } from "react-router";

const PrivateRoute = ({ logged, path, exact, component}) => {
    if (logged){
        return <Route path={path} exact={exact} component={component} />;
    } else {
        return <Redirect to={{ pathname: "/login" }} />;
    }
};

export default PrivateRoute;