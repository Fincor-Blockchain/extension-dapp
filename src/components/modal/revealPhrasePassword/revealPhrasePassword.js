import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Container, Typography, Box, Button, Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { back } from "../../../assets/images";
import ErrorIcon from "@material-ui/icons/Error";
import { useHistory } from "react-router-dom";
import validate from "validate.js";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import { RevealMnemonics } from "..";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 20px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiFormHelperText-root": {
            color: "red",
        },
    },
    input: {
        outline: "none",
        padding: "10px 11.5px 10px 20.7px",
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
    headingWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 0px 30px 0px",
    },
    icon: {
        padding: 12,
        marginRight: 1,
        backgroundColor: theme.palette.primary.lightSmokeGray,
        color: theme.palette.primary.blue,
        borderRadius: "50%",
        cursor: "pointer",
        [theme.breakpoints.down("xs")]: {
            padding: 7,
        },
    },
    main: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
    },
    bodyWrapper: {
        width: "100%",
        borderTop: "2.8px solid #23224e",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundColor: "#f5f5f5",
        padding: "6px 12px 6px 12px",
    },
    CloseIcon: {
        color: theme.palette.white,
        padding: "7px",
        backgroundColor: theme.palette.primary.blue,
        borderRadius: 7,
        cursor: "pointer",
    },
    help: {
        margin: "20px 0px 18px 0px",
        fontFamily: "Poppins",
        fontSize: 18,
        lineHeight: 2,
        color: theme.palette.primary.blue,
        fontWeight: 600,
    },
    checkBoxContainer: {
        width: "100%",
        display: "flex",
        marginTop: 12,
    },
    iconCaution: {
        color: theme.palette.primary.lightSmokeGray,
        marginRight: 10,
    },
    caution: {
        color: theme.palette.primary.darkGray,
        fontFamily: "Poppins",
        fontSize: 12,
        lineHeight: 1.5,
        textAlign: "left",
    },
    iconColor: {
        color: theme.palette.primary.blue,
    },
    cancel: {
        color: theme.palette.yellow,
        borderColor: theme.palette.yellow,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const schema = {
    password: {
        presence: true,
        format: {
            pattern:
                /(?=^.{8,}$)(?=.*\d)(?=.*[!$%^&()_+|~=`{}[\]:";'<>?,.#@*-/\\]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
                " should be at least 8 characters and should contain lower case letter, upper case letter, number, special symbol.",
        },
    },
};

const RevealPhrasePassword = (props) => {
    const { isOpen, toggle } = props;
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = React.useState({
        isOpenReceive: false,
        password: "",
        touched: {
            password: false,
        },
    });

    const handleChange = (e) => {
        e.persist();
        setState({
            ...state,
            touched: { ...state.touched, [e.target.name]: true },
            [e.target.name]: e.target.value,
        });
    };
    let errors = validate(
        {
            password: state.password,
        },
        schema,
    );
    errors = errors || {};
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const goBack = () => {
        history.push("/setting");
    };
    const toggleReceiveOpen = () => {
        toggle();
        setState({ ...state, isOpenReceive: true });
    };
    const toggleReceiveClose = () => {
        setState({ ...state, isOpenReceive: false });
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={isOpen}
                            onClose={() =>
                                toggle(
                                    setState({
                                        ...state,
                                        password: "",
                                        touched: {
                                            password: false,
                                        },
                                    }),
                                )
                            }
                            TransitionComponent={Transition}>
                            <div className={classes.root}>
                                <Box className={classes.headingWrapper}>
                                    <img
                                        src={back}
                                        alt="back"
                                        style={{ cursor: "pointer" }}
                                        onClick={toggle}
                                    />
                                    <Typography variant="h1">Seed phrase</Typography>
                                    <CloseIcon className={classes.CloseIcon} onClick={toggle} />
                                </Box>
                                <Box className={classes.main}>
                                    <Box className={classes.bodyWrapper}>
                                        <Typography variant="body1">
                                            Fincor Wallet would like to gather usage data to use
                                            better understand how our user intract with extension.
                                            This data will be used continuously to improve the
                                            usability and ethereium ecosystem.
                                        </Typography>
                                    </Box>
                                    <Typography className={classes.help}>
                                        Enter your password to conitune
                                    </Typography>
                                    <FormControl className={classes.form}>
                                        <Input
                                            type={state.showPassword ? "text" : "password"}
                                            value={state.password || ""}
                                            error={state.touched.password && errors.password}
                                            onChange={handleChange}
                                            name="password"
                                            disableUnderline={true}
                                            fullWidth={true}
                                            placeholder="Enter your password"
                                            className={classes.input}
                                            style={
                                                state.touched.password && errors.password
                                                    ? { border: "solid 1px red" }
                                                    : { border: "solid 1px #e6e6e6" }
                                            }
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
                                    </FormControl>
                                    {state.touched.password && errors.password ? (
                                        <Typography
                                            style={{
                                                color: "red",
                                                fontSize: 12,
                                                padding: "0px  16px",
                                                lineHeight: 1.4,
                                                textAlign: "left",
                                            }}>
                                            {errors.password && errors.password[0]}
                                        </Typography>
                                    ) : null}
                                    <Box className={classes.checkBoxContainer}>
                                        <ErrorIcon className={classes.iconCaution} />
                                        <Typography className={classes.caution}>
                                            DO NOT share this phrase with anyone!
                                            <br /> These words can be used to steal all your
                                            accounts.
                                        </Typography>
                                    </Box>
                                    <Button
                                        onClick={toggleReceiveOpen}
                                        disabled={errors.password}
                                        type="submit">
                                        Next
                                    </Button>
                                    <Typography
                                        className={classes.cancel}
                                        variant="body2"
                                        onClick={goBack}>
                                        Cancel Process
                                    </Typography>
                                </Box>
                            </div>
                        </Dialog>
                    </Grid>
                </Grid>
                <RevealMnemonics toggle={toggleReceiveClose} isOpen={state.isOpenReceive} />
            </Container>
        </div>
    );
};
export default RevealPhrasePassword;
