import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FNR } from "../../../assets/images";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { NoData } from "../../../components";
import { useSelector } from "react-redux";
import { SYMBOL_REGEX } from "../../../vars/regex";
import { SCALE } from "../../../vars/scale";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import { denomToSymbol } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "300px",
    overflow: "scroll",
  },
  sendBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    width: "100%",
  },
  sendBody: {
    display: "flex",
    justifyContent: "space-between",
  },
  mainBox: {
    padding: "11px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  imgSend: {
    width: 22,
    objectFit: "contain",
    marginRight: 8,
  },
  address: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: "10px",
  },
  date: {
    fontSize: "10px",
  },
  hashText: {
    fontSize: "10px",
    maxWidth: 150,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  txsDetails: {
    display: "flex",
    justifyContent: "flex-end",
  },
  linkColor: {
    textDecoration: "none",
  },
}));

const Activity = () => {
  const classes = useStyles();
  const { allTxs, allTxsLoading } = useSelector((state) => state.wallet);
  const address = useSelector((store) => store.encrypt.address);
  const getType = (to, from) => {
    const type =
      to === from
        ? "Self"
        : address === to
        ? "Recevied"
        : address === from
        ? "Send"
        : null;
    return type;
  };

  const coinImages = (value) => {
    var symbol = value;
    if (symbol === "fnr") {
      return FNR;
    } else {
      return FNR;
    }
  };

  return (
    <div style={{ marginTop: -4 }}>
      {allTxsLoading ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "120px",
          }}
        >
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={30}
            thickness={4}
          />
        </Box>
      ) : allTxs && allTxs.length > 0 ? (
        <div style={{ height: 301 }}>
          <Scrollbars>
            {allTxs &&
              allTxs.map((item, index) => (
                <a
                  href={`${process.env.REACT_APP_EXPLORER_URL}/txs/${item.txhash}`}
                  target="_blank"
                  className={classes.linkColor}
                  rel="noreferrer"
                  key={index}
                >
                  <Box className={classes.mainBox}>
                    <img
                      src={coinImages(
                        item.tx.value.msg[0].value.amount[0].denom.replace(
                          SYMBOL_REGEX,
                          ""
                        )
                      )}
                      alt="fnr"
                      className={classes.imgSend}
                    />
                    <Box className={classes.sendBox}>
                      <Box className={classes.sendBody}>
                        <Typography>
                          {getType(
                            item.tx.value.msg[0].value.to_address,
                            item.tx.value.msg[0].value.from_address
                          )}
                        </Typography>
                        <Typography>
                          {item.tx.value.msg[0].value.amount[0].amount / SCALE}
                          &nbsp;
                          {denomToSymbol(
                            item.tx.value.msg[0].value.amount[0].denom
                          )}
                        </Typography>
                      </Box>
                      <Box className={classes.sendBody}>
                        <Typography className={classes.date}>
                          {moment(item.timestamp).format("MMM DD")}
                        </Typography>

                        <Typography className={classes.hashText}>
                          {item.txhash}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </a>
              ))}
          </Scrollbars>
        </div>
      ) : (
        <NoData description="There are no transactions!" />
      )}
    </div>
  );
};

export default Activity;
