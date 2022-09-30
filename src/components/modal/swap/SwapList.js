import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Box, Typography, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Scrollbars from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        backgroundColor: theme.palette.primary.light,
        padding: "0 20px 0px 14px",
        "& .MuiContainer-root": {
            maxWidth: 560,
        },
        "& .MuiList-root": {
            width: "95%",
        },
        "& .MuiListItem-gutters": {
            padding: "0px 4px",
        },
        "& .MuiTableRow-root": {
            display: "table",
            width: "100%",
        },
        "& .MuiTableContainer-root": {
            width: "auto",
        },
        "& .MuiDialog-paper": {
            overflow: "hidden",
            margin: "0px",
            width: "100%",
            maxWidth: "435px",
            border: "solid 1px #d5d5d5",
            boxShadow: "none",
        },
        "& .MuiBackdrop-root": {
            backgroundColor: theme.palette.white,
        },
        "& .MuiTableRow-root.Mui-selected": {
            backgroundColor: theme.palette.primary.lightGray,
        },
        "& .MuiTableCell-root": {
            borderBottom: "0px",
        },
    },
    main: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },

    btn: {
        color: "#fff",
        height: "23px",
        fontSize: 12,
        borderRadius: "30px",
        backgroundColor: "#e6814e !important",
        margin: 0,
        padding: "0px !important",
    },
    btn1: {
        color: "#fff",
        height: "23px",
        fontSize: 12,
        borderRadius: "30px",
        backgroundColor: "#329b43 !important",
        margin: 0,
        padding: "0px !important",
    },
    iconBg: {
        backgroundColor: theme.palette.primary.blue,
        borderRadius: "50%",
        marginLeft: "6px",
        height: 20,
        width: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
    },
    btnWrapper: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    heading: {
        color: theme.palette.primary.blue,
        fontSize: 19,
        lineHeight: 2.74,
        fontWeight: 500,
    },
    text: {
        color: theme.palette.primary.darkGray,
        fontSize: 13,
        textAlign: "center",
    },
    table: {
        "& .MuiTableRow-root": {
            width: 400,
            [theme.breakpoints.down("xs")]: {
                width: "100%",
            },
        },
    },
    tableTitle: {
        color: theme.palette.darkBlack,
        textAlign: "left",
        fontWeight: 600,
        fontSize: 13,
        lineHeight: 1.2,
    },
    priceWrapper: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "left",
    },
    amount: {
        color: theme.palette.darkBlack,
        fontSize: 13,
        textAlign: "left",
    },
    amountColor: {
        color: theme.palette.primary.blue,
        fontSize: 13,
        textAlign: "left",
    },
    amountPercent: {
        color: theme.palette.primary.blue,
        fontSize: 16,
        fontWeight: 500,
        textAlign: "left",
    },
    amountPercentColor: {
        color: theme.palette.primary.blue,
        fontSize: 16,
        fontWeight: 500,
        textAlign: "left",
    },
}));

const rows = [
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "RFQ",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "AGG",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "RFQ",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "AGG",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "RFQ",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "RFQ",
    },
    {
        recieveAmount: "0.0253554",
        silppage: "0% silppage",
        networkFee: "$3.25",
        btnText: "RFQ",
    },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const SwapList = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <Dialog
                            className={classes.root}
                            open={props.open}
                            TransitionComponent={Transition}>
                            <Box className={classes.main}>
                                <Typography className={classes.heading}>Quote Detail</Typography>
                                <Typography className={classes.text}>
                                    Below are the quotes gathered from
                                    <br /> multiple liquidity sources
                                </Typography>
                                <TableContainer>
                                    <Table className={classes.table} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableTitle}>
                                                    WBTC
                                                    <br /> Receiving
                                                </TableCell>
                                                <TableCell className={classes.tableTitle}>
                                                    Estimated <br />
                                                    network fee
                                                </TableCell>
                                                <TableCell className={classes.tableTitle}>
                                                    Quote
                                                    <br /> source
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <Scrollbars autoHeight autoHide>
                                            <TableBody>
                                                {rows.map((item, index) => (
                                                    <TableRow
                                                        key={index}
                                                        selected={selectedIndex === index}
                                                        onClick={(event) =>
                                                            handleListItemClick(event, index)
                                                        }>
                                                        <TableCell>
                                                            <Typography
                                                                className={
                                                                    selectedIndex === index
                                                                        ? classes.amountColor
                                                                        : classes.amount
                                                                }>
                                                                {item.recieveAmount}
                                                            </Typography>
                                                            <Typography
                                                                className={
                                                                    selectedIndex === index
                                                                        ? classes.amountPercentColor
                                                                        : classes.amountPercent
                                                                }>
                                                                {item.silppage}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            className={
                                                                selectedIndex === index
                                                                    ? classes.amountPercentColor
                                                                    : classes.amountPercent
                                                            }>
                                                            {item.networkFee}
                                                        </TableCell>
                                                        <TableCell className={classes.btnWrapper}>
                                                            <Button
                                                                className={
                                                                    index % 2 === 0
                                                                        ? classes.btn1
                                                                        : classes.btn
                                                                }>
                                                                {item.btnText}
                                                            </Button>
                                                            <ChevronRightIcon
                                                                className={classes.iconBg}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Scrollbars>
                                    </Table>
                                </TableContainer>
                                <Button>Confirm</Button>
                                <Typography variant="body2" onClick={props.showModel}>
                                    Cancel Process
                                </Typography>
                            </Box>
                        </Dialog>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
export default SwapList;
