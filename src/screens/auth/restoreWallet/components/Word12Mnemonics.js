import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Container, Button, TextField } from "@material-ui/core";
import { logo } from "../../../../assets/images";
import { RestoreModal } from "../../../../components/modal";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        "& .MuiContainer-root": {
            maxWidth: 500,
            padding: "0 50px 0px 50px",
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
    bodyWrapper: {
        width: "100%",
        borderTop: "2.8px solid #23224e",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: theme.palette.smokeWhite,
        padding: "6px 12px 10px 12px",
        [theme.breakpoints.down("xs")]: {
            maxHeight: "110px",
        },
    },
    btnWrapper: {
        display: "flex",
        flexDirection: " column",
        alignItems: "center",
        justifyContent: " center",
    },

    numberBox: {
        width: 28,
        height: 42,
        backgroundColor: theme.palette.primary.blue,
        position: "absolute",
        marginTop: 10,
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
        width: "100%",
        "&.Mui-focused": {
            border: "none",
        },

        "& .MuiOutlinedInput-input": {
            fontFamily: "Gilroy-Light",
            fontSize: "14px",
            fontWeight: "300",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "1.5",
            letterSpacing: "normal",
            textAlign: "center",
            color: theme.palette.primary.darkWhite,
            paddingLeft: 30,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            marginRight: 12,
            width: "120px",
            height: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginTop: 10,
            [theme.breakpoints.down("xs")]: {
                width: "94px",
            },
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "&.Mui-focused fieldset": {
                border: "none ",
            },
        },
    },
    break: {
        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },
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

const Word12Mnemonics = (props) => {
    const {
        word,
        isModalOpen,
        invalidMnemonics,
        cancelProcess,
        handleMnemonics,
        submitMnemonicPhraseHandler,
    } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Box className={classes.headingWrapper}>
                                <img src={logo} alt="logo" className={classes.logo} />
                                <Typography variant="h1">
                                    Help us to improve your Fincor Wallet
                                </Typography>
                            </Box>
                            <Box className={classes.bodyWrapper}>
                                <Typography variant="body1" className={classes.break}>
                                    Write this phrase on the piece of paper and store in a secure
                                    location. If you want even more security, write it down on the
                                    multiple piece of papers and sore each In 2 -3 locations
                                </Typography>
                            </Box>

                            <Typography variant="h3">
                                Your secret backup phrase will help to backup and restore your
                                wallet
                            </Typography>
                            <form onSubmit={submitMnemonicPhraseHandler}>
                                <Box className={classes.InputBox}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>1</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="one"
                                                    value={word.one || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>2</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="two"
                                                    value={word.two || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>3</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="three"
                                                    value={word.three || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>4</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="four"
                                                    value={word.four || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>5</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="five"
                                                    value={word.five || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>6</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="six"
                                                    value={word.six || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>7</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="seven"
                                                    value={word.seven || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>8</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="eight"
                                                    value={word.eight || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>9</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="nine"
                                                    value={word.nine || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>10</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="ten"
                                                    value={word.ten || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>11</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="eleven"
                                                    value={word.eleven || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box>
                                                <Box className={classes.numberBox}>12</Box>
                                                <TextField
                                                    variant="outlined"
                                                    name="twelve"
                                                    value={word.twelve || ""}
                                                    onChange={handleMnemonics}
                                                    autoComplete="off"
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {invalidMnemonics && (
                                    <Box className={classes.errorBox}>
                                        Test failed please try again
                                    </Box>
                                )}

                                <Box className={classes.btnWrapper}>
                                    <Button onClick={submitMnemonicPhraseHandler} type="submit">
                                        Proceed
                                    </Button>
                                    <Typography variant="body2" onClick={cancelProcess}>
                                        Cancel Process
                                    </Typography>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <RestoreModal
                isOpen={isModalOpen}
            />
        </div>
    );
};
export default Word12Mnemonics;
