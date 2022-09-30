import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, isAuthenticate, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (isAuthenticate !== "" ? <Component {...props} /> : <Redirect to="/" />)}
    />
);

PrivateRoute.propTypes = {
    isAuthenticate: PropTypes.any,
};

const mapStateToProps = (state) => ({
    isAuthenticate: state.encrypt.address,
});

export default connect(mapStateToProps)(PrivateRoute);
