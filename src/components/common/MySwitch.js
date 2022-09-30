import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 42,
        height: 26,
        padding: 2,
        margin: theme.spacing(1),
    },
    switchBase: {
        top: 5,
        left: 3,
        padding: 1,
        color: "#0666cc",
        "&$checked": {
            color: "#0666cc",
            transform: "translateX(16px)",
            "& + $track": {
                backgroundColor: "#8AA7E4",
                opacity: 1,
            },
        },
        "&$focusVisible $thumb": {
            color: "#8aa7e4",
            border: "6px solid #fff",
        },
    },
    thumb: {
        width: 16,
        height: 16,
        position: "relative",
        top: 0,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: "#fff",
        opacity: 1,
        transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

const MySwitch = (props) => {
    const { checked, name, onChange } = props;

    return (
        <div>
            <IOSSwitch checked={checked} onChange={onChange} name={name} />
        </div>
    );
};

export default MySwitch;
