import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography, Button, FormHelperText } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { bgImage } from "../../../assets/images";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiTypography-body2": {
            margin: "-25px 0px 15px 0px",
        },
        "& .MuiDialog-paper": {
            overflow: "hidden",
            margin: "0px",
            width: "100vw",
            maxWidth: "415px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },

        "& .MuiOutlinedInput-root": {
            borderRadius: "30px",
            margin: "0 auto",
            width: "90%",
            height: "42px",
            display: "flex",
            fontSize: 12,
            color: theme.palette.primary.blue,
            justifyContent: "center",
            alignItems: "center",
            border: " solid 1px #e6e6e6",
            marginTop: 10,
            "& fieldset": {
                border: "none",
            },
            "&:hover fieldset": {
                border: "none ",
            },
            "& .Mui-focused fieldset": {
                border: "none ",
            },
        },
    },

    close: {
        color: "#fff",
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 160,
        height: 160,
        margin: "30px 0",
        objectFit: "contain",
    },

    address: {
        color: theme.palette.primary.blue,
        fontSize: 18,
        fontFamily: "Poppins",
        fontWeight: 500,
        // [theme.breakpoints.down("xs")]: {
        //     fontSize: 12,
        // },
    },
    key: {
        color: theme.palette.primary.blue,
        lineHeight: 1.5,
        fontSize: 12,
        fontFamily: "Poppins",
        fontWeight: 500,
    },
    btn: {
        marginBottom: "40px !important ",
    },

    createWallet: {
        width: "100%",
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "20px",
    },
    input: {
        outline: "none",
        padding: "4px 11.5px 4px 20.7px",
        backgroundColor: theme.palette.white,
        borderRadius: "0px",
        border: "1px solid gray",
        "& input.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd": {
            color: theme.palette.primary.blue,
            fontSize: "14px",
            fontFamily: "Poppins",
            fontWeight: 300,
            letterSpacing: 1,
        },
    },
    form: {
        width: "100%",
        marginBottom: "10px",
    },
    iconColor: {
        color: theme.palette.primary.blue,
        fontSize: "18px",
    },
    label: {
        fontFamily: "Poppins",
        color: theme.palette.darkBlack,
        fontSize: 12,
    },
    span: {
        color: "#93cec3",
        borderBottom: "1px solid #93cec3",
        marginLeft: 5,
    },
    checkboxWrapper: {
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Password = (props) => {
    const {
        isOpen,
        toggle,
        password,
        hasPasswordError,
        onChange,
        passwordHandler,
        setIsVerification,
    } = props;
    const classes = useStyles();
    const [state, setState] = useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={isOpen}
                            onClose={toggle}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <img src={bgImage} alt="victory" className={classes.img} />

                                <Box className={classes.createWallet}>
                                    <Typography variant="h3">
                                        Enter your account password
                                    </Typography>
                                    <form onSubmit={passwordHandler}>
                                        <FormControl className={classes.form}>
                                            <Input
                                                type={state.showPassword ? "text" : "password"}
                                                value={password || ""}
                                                error={hasPasswordError}
                                                onChange={onChange}
                                                name="password"
                                                disableUnderline={true}
                                                fullWidth={true}
                                                placeholder="Enter your password"
                                                style={
                                                    hasPasswordError
                                                        ? { border: "1px solid red" }
                                                        : { border: "solid 1px #e6e6e6" }
                                                }
                                                className={classes.input}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}>
                                                            {state.showPassword ? (
                                                                <VisibilityIcon
                                                                    className={classes.iconColor}
                                                                />
                                                            ) : (
                                                                <VisibilityOffIcon
                                                                    className={classes.iconColor}
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText style={{ color: "red" }}>
                                                {hasPasswordError ? "Invalid password" : null}
                                            </FormHelperText>
                                        </FormControl>
                                    </form>
                                </Box>

                                <Button
                                    className={classes.btn}
                                    onClick={passwordHandler}
                                    type="submit">
                                    Verify
                                </Button>
                                <Typography
                                    variant="body2"
                                    onClick={() => setIsVerification(false)}>
                                    Cancel
                                </Typography>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default Password;
