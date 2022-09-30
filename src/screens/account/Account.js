import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Box } from "@material-ui/core";
import { Accounts } from "../../components/account";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
  },
}));

const Account = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.main}>
        <Accounts />
      </Box>
    </div>
  );
};

export default Account;
