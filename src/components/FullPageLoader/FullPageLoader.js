import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStylesLoader = makeStyles((theme) => ({
    loading: {
        display: "inline-block",
        width: "40px",
        height: "40px",
        border: "2px solid rgba(100, 100, 100, 0.2)",
        borderRadius: "50%",
        borderTopColor: "#d5da43",
        animation: "spin 1s ease-in-out infinite",
        left: "calc(50% - 20px)",
        top: " calc(50% - 20px)",
        position: "fixed",
        zIndex: 1,
    },

    "@keyframes spin": {
        to: {
            transform: "rotate(360deg)",
        },
    },

    "@-webkit-keyframes spin": {
        to: {
            transform: "rotate(360deg)",
        },
    },
}));

const FullPageLoader = () => {
    const classes = useStylesLoader();
    return (
        <div className={classes.centerSpinner}>
            <div className={classes.loading}></div>
        </div>
    );
};

export default FullPageLoader;
