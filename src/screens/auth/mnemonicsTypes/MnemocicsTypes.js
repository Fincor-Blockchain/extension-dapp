import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button } from "@material-ui/core";
import { logo } from "../../../assets/images";
import { getRandom } from "../../../utils/utils";
import { SuccessModal } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import fileEncryptionService from "../../../services/fileEncryptionService";
import { encryptionConst } from "../../../utils/contant";
import { setEncryptedData } from "../../../redux/encryption/actions";
import { clearWords } from "../../../redux/auth/actions";
import ExtensionStore from "../../../utils/local-store";
import { activeAccount, activeIndex } from "../../../redux/wallet/actions";
import Fincor from "../../../services/fincor";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    "& .MuiContainer-root": {
      maxWidth: 500,
      padding: "0 30px 0px 30px",
    },
    "& .MuiButton-contained": {
      borderRadius: 10,
      margin: "20px 0px -4px 0px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.16) !important",
      backgroundColor: "#ffffff !important",
      fontFamily: "Poppins",
      fontSize: 14,
      color: theme.palette.primary.darkWhite,
      padding: " 18px 40px !important",
      [theme.breakpoints.down("xs")]: {
        padding: "18px 30px !important",
      },
    },
  },

  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    margin: "21px 0px 21px 0px",
  },
  btnWrapper: {
    display: "flex",
    flexDirection: " column",
    alignItems: "center",
    justifyContent: " center",
    marginTop: 10,
  },

  numberBox: {
    width: 28,
    height: 42,
    backgroundColor: theme.palette.primary.blue,
    position: "absolute",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontSize: 18,
    lineHeight: 1.27,
    textAlign: "center",
    color: theme.palette.white,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    zIndex: 1,
    transition: ".5s ease-out",

    [theme.breakpoints.down("xs")]: {
      fontSize: 15,
    },
  },
  InputBox: {
    position: "relative",
    margin: 4,
  },
  btnWidth: {
    width: "100% !important",
    minWidth: "134px !important",
    maxWidth: "134px !important",
    textTransform: "initial",
    height: 44,
    [theme.breakpoints.down("xs")]: {
      minWidth: "100px !important",
      maxWidth: "100px !important",
    },
  },
  wordBox: {
    border: `2px solid ${theme.palette.primary.blue}`,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Gilroy-Light",
    fontSize: "16px",
    fontWeight: "300",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.5",
    letterSpacing: "normal",
    textAlign: "center",
    color: theme.palette.primary.darkWhite,
    paddingLeft: 20,
  },
  errorBox: {
    fontFamily: "Gilroy-Light",
    fontSize: "12px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "normal",
    textAlign: "center",
    color: "#da0000",
  },
}));

const MnemonicsTypes = (props) => {
  const { password, setScreen } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [state, setState] = useState({
    isOpenModal: false,
    hasError: false,
  });
  const [randomMnemonics, setRandomMnemonics] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [reset, setReset] = useState(false);

  const { mnemonicWords } = useSelector((state) => state.auth);
  const mnemonics = mnemonicWords && mnemonicWords.split(" ");

  const cancelProcess = () => {
    setScreen(2);
  };

  const handleSelectWords = (word) => {
    selectedWords.length <= 3 && setSelectedWords([...selectedWords, word]);
  };

  const handleReset = () => {
    setSelectedWords([]);
    setReset(!reset);
    setState({ ...state, hasError: false });
  };

  const getNewAccountFromTemplate = ({
    index,
    timestamp,
    publicKey,
    secretKey,
    address,
  }) => ({
    displayName: index > 0 ? `Account ${index}` : "Main Account",
    created: timestamp,
    path: `0/0/${index}`,
    publicKey,
    secretKey,
    address,
  });

  const createWalletFile = async () => {
    try {
      const walletAddress = Fincor.getAddress(mnemonicWords);
      const privateKey = Fincor.getECPairPriv(mnemonicWords).toString("hex");
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const mnemonic = mnemonicWords;
      const privArr = [{ privateKey: privateKey }];

      const dataToEncrypt = {
        mnemonic: mnemonic,
        privArr: privArr,
        accounts: [
          getNewAccountFromTemplate({
            address: walletAddress,
            index: 0,
            timestamp,
            publicKey: {},
            secretKey: {},
          }),
        ],
        contacts: [],
      };
      const meta = {
        displayName: "Main Account",
        created: timestamp,
        netId: 0,
        meta: { salt: encryptionConst.DEFAULT_SALT },
      };
      const data = [
        { displayName: "Main Account", index: 0, address: walletAddress },
      ];
      ExtensionStore.set({ activeAccounts: data });
      dispatch(activeAccount(data));
      dispatch(activeIndex(0));
      const key = fileEncryptionService.createEncryptionKey(password);
      const encryptedAccountsData = fileEncryptionService.encryptData({
        data: JSON.stringify(dataToEncrypt),
        key,
      });
      if (ExtensionStore.isSupported) {
        ExtensionStore.set({ encryptedData: encryptedAccountsData });
      } else {
        dispatch(setEncryptedData(encryptedAccountsData));
      }
      setState({ ...state, isOpenModal: true });
      dispatch(clearWords());
      return {
        error: null,
        meta,
        accounts: dataToEncrypt.accounts,
        mnemonic: mnemonic,
      };
    } catch (error) {
      return { error, meta: null };
    }
  };

  useEffect(() => {
    if (selectedWords.length === 4) {
      let match = selectedWords.every(
        (item, i) => mnemonics.indexOf(item) === randomNumbers[i] - 1
      );
      match && createWalletFile();
      !match && setState({ ...state, hasError: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWords]);

  useEffect(() => {
    setRandomMnemonics(getRandom(mnemonics, 12));
    setRandomNumbers(getRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <div className={classes.root}>
      <Container>
        <SuccessModal isOpen={state.isOpenModal} />
        <Grid container>
          <Grid item xs={12}>
            <Box className={classes.main}>
              <Box className={classes.headingWrapper}>
                <img src={logo} alt="logo" className={classes.logo} />
                <Typography variant="h1">
                  Confirm your secret Backup phrase
                </Typography>
              </Box>
              <Typography variant="h3">
                Your secret backup phrase will help to backup and restore your
                wallet
              </Typography>
              <Grid container>
                {randomNumbers.map((item, i) => (
                  <Grid item xs={4} key={i}>
                    <Box className={classes.InputBox}>
                      <Box className={classes.numberBox}>{item}</Box>
                      <Box className={classes.wordBox}>{selectedWords[i]}</Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Grid container style={{ marginBottom: "16px" }}>
                {randomMnemonics &&
                  randomMnemonics.map((item, i) => (
                    <Grid item xs={4} key={i}>
                      <Box>
                        <Button
                          className={classes.btnWidth}
                          variant="contained"
                          onClick={() => handleSelectWords(item)}
                        >
                          {item}
                        </Button>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
              {state.hasError && (
                <Box className={classes.errorBox}>
                  Test failed please try again
                </Box>
              )}
              <Box className={classes.btnWrapper}>
                <Button
                  onClick={() => handleReset()}
                  style={{ margin: "unset" }}
                >
                  Reset
                </Button>
                <Typography variant="body2" onClick={cancelProcess}>
                  Cancel Process
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default MnemonicsTypes;
