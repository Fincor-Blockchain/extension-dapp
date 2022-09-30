import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { transactionBg } from '../../assets/images/index';


const useStyles = makeStyles((theme) => ({
    modalCentered: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        padding: ' 1rem;',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    setBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    circleHeading: {
        fontFamily: 'Poppins',
        fontSize: 80,
        fontWeight: 300,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.28',
        letterSpacing: 'normal',
        textAlign: 'left',
        color: '#fff',
        position: 'absolute',
    },
    Wrapper: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
    },
    circleText: {
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 400,
        fontStyle: "italic",
        lineHeight: 1.5,
        textAlign: "center",
        color: "#8a909a",
        marginTop: 10
    },
    img: {
        width: "100%",
        maxWidth: 190
    },
    title: {
        color: "#1f4bb1",
        fontFamily: "Poppins",
        fontSize: 12,
        fontWeight: 500,
        marginTop: 4
    }
}));




const NoData = (props) => {
    const { description, title } = props;
    const classes = useStyles();
    return (
        <Box className={classes.Wrapper}>
            <Box className={classes.modalCentered}>
                <Box className={classes.setBox}>
                    <img src={transactionBg} alt="transaction" className={classes.img} />
                    <Typography className={classes.circleHeading}>
                        0
                    </Typography>
                </Box>
                <Typography className={classes.circleText}>{description}</Typography>
                <Typography className={classes.title}>{title}</Typography>
            </Box>

        </Box>


    );
};
export default NoData;