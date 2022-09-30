import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Grid, Box, FormHelperText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { createWalletLock, eye, eyeOff, logo } from "../../../../assets/images";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import validate from "validate.js";
import { schema } from "../../../../utils/contant";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiCheckbox-colorPrimary": {
            color: theme.palette.seaGreen,
        },
        "& .MuiSvgIcon-root": {
            width: "18px",
            height: "18px",
        },
        "& .MuiFormHelperText-root": {
            color: "red",
            fontSize: 12,
        },
    },

    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        width: 133,
        height: 138.8,
        objectFit: "contain",
    },

    logo: {
        margin: "20px 0px 10px 0px",
    },
    headingWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    createWallet: {
        padding: "20.2px 22px 20.6px 22px",
        width: "100%",
        maxWidth: 300,
        border: "solid 0.8px #d5d5d5",
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
        borderRadius: "30px",
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
        justifyContent: "flex-start",
        display: "flex",
        alignItems: "center",
    },
    formBox: {
        textAlign: "center",
    },
}));

const RestorePassword = (props) => {
    const { state, setState, setScreen } = props;
    const classes = useStyles();

    useEffect(() => {
        const errors = validate(state.values, schema);
        setState((state) => ({
            ...state,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [state.values, setState]);

    const handleChange = (e) => {
        e.persist();
        setState((state) => ({
            ...state,
            values: {
                ...state.values,
                [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
            },
            touched: {
                ...state.touched,
                [e.target.name]: true,
            },
        }));
    };

    const hasError = (field) => (state.touched[field] && state.errors[field] ? true : false);

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    const showConfirmPassword = () => {
        setState({ ...state, showConfirmPassword: !state.showConfirmPassword });
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Box className={classes.main}>
                            <Box className={classes.headingWrapper}>
                                <img src={logo} alt="logo" className={classes.logo} />
                                <Typography variant="h1">New to Fincor Wallet</Typography>
                            </Box>

                            <Box className={classes.createWallet}>
                                <img
                                    src={createWalletLock}
                                    alt="createWallet"
                                    className={classes.img}
                                />
                                <Typography variant="h3">Enter your account password</Typography>

                                <Box className={classes.formBox}>
                                    <FormControl className={classes.form}>
                                        <Input
                                            type={state.showPassword ? "text" : "password"}
                                            value={state.values.password || ""}
                                            error={hasError("password")}
                                            onChange={handleChange}
                                            name="password"
                                            disableUnderline={true}
                                            fullWidth={true}
                                            placeholder="Enter your password"
                                            style={
                                                hasError("password")
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
                                                            <img
                                                                src={eye}
                                                                className={classes.iconColor}
                                                                alt="eye"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={eyeOff}
                                                                className={classes.iconColor}
                                                                alt="eye"
                                                            />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        <FormHelperText>
                                            {hasError("password") ? state.errors.password[0] : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl className={classes.form}>
                                        <Input
                                            type={state.showConfirmPassword ? "text" : "password"}
                                            value={state.values.confirmPassword || ""}
                                            error={hasError("confirmPassword")}
                                            onChange={handleChange}
                                            name="confirmPassword"
                                            disableUnderline={true}
                                            fullWidth={true}
                                            placeholder="Confirm password"
                                            style={
                                                hasError("confirmPassword")
                                                    ? { border: "1px solid red" }
                                                    : { border: "solid 1px #e6e6e6" }
                                            }
                                            className={classes.input}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={showConfirmPassword}>
                                                        {state.showConfirmPassword ? (
                                                            <img
                                                                src={eye}
                                                                className={classes.iconColor}
                                                                alt="eye"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={eyeOff}
                                                                className={classes.iconColor}
                                                                alt="eye"
                                                            />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />

                                        <FormHelperText>
                                            {hasError("confirmPassword")
                                                ? state.errors.confirmPassword[0]
                                                : null}
                                        </FormHelperText>
                                    </FormControl>
                                
                                    <FormHelperText error className={classes.formBox}>
                                        {hasError("policy") ? state.errors.policy[0] : null}
                                    </FormHelperText>
                                    <Button
                                        onClick={() => setScreen(3)}
                                        type="submit"
                                        disabled={
                                            !state.isValid ||
                                            !state.values.password ||
                                            !state.values.confirmPassword
                                        }>
                                        Continue
                                    </Button>
                                </Box>

                                <Typography variant="body2" onClick={() => setScreen(1)}>
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

export default RestorePassword;
