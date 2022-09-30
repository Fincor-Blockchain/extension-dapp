import { colors } from "@material-ui/core";

const white = "#ffff";
const black = "#000";
const darkBlack = "#464646";
const lightBlack = "#000000";
const darkWhite = "#5b5b5b";
const blue = "#23224e";
const gray = "#d5d5d5";
const yellow = "#d5da43";
const lightBlue = "#8aa7e4";
const textColour = " #1c60ef";
const seaGreen = " #93cec3";
const smokeWhite = " #f5f5f5";
const errorRed = "red";
const themeBackgroundColor = "#f8f8fb";
const themePrimaryColor = "#000000";
const themeLightTextColor = "#092326";
const themeLightGrayColor = "#f2f2f2";
const themeLightSmokeGrayColor = "#e6e6e6";
const themeDarkGrayColor = "#8a909a";

export const palette = {
  black,
  white,
  blue,
  gray,
  yellow,
  seaGreen,
  darkBlack,
  smokeWhite,

  primary: {
    lightBlack: lightBlack,
    darkWhite: darkWhite,
    background: themeBackgroundColor,
    contrastText: themePrimaryColor,
    dark: themePrimaryColor,
    main: themePrimaryColor,
    light: white,
    blue: blue,
    errorRed: errorRed,
    textColour: textColour,
    lightBlue: lightBlue,
    darkGray: themeDarkGrayColor,
    lightGray: themeLightGrayColor,
    lightSmokeGray: themeLightSmokeGrayColor,
  },
  secondary: {
    contrastText: white,
    dark: themePrimaryColor,
    main: themePrimaryColor,
    light: themePrimaryColor,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: white,
    link: colors.blue[600],
    light: themeLightTextColor,
    darkWhite: darkWhite,
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  divider: colors.grey[200],
};
