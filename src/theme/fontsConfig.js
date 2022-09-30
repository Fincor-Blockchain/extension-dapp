import GilroyLight from "../../src/assets/fonts/Gilroy-Light.ttf";
import GilroyRegular from "../../src/assets/fonts/Gilroy-Regular.ttf";
import GilroySemiBold from "../../src/assets/fonts/Gilroy-SemiBold.ttf";
import GilroyLightItalic from "../../src/assets/fonts/Gilroy-LightItalic.ttf";
import GilroyMedium from "../../src/assets/fonts/Gilroy-Medium.ttf";

const giloryregular = {
  fontFamily: "Gilroy-Regular",
  fontStyle: "normal",
  //   fontDisplay: "block",
  // fontWeight: "normal",
  src: `
      local('Gilroy-Regular'),
      url(${GilroyRegular}) format('ttf')
    `,
};
const gilorylight = {
  fontFamily: "Gilroy-Light",
  fontStyle: "normal",
  fontDisplay: "block",
  fontWeight: "normal",
  src: `
      local('Gilroy-Light'),
      url(${GilroyLight}) format('ttf')
    `,
};
const gilorysemibold = {
  fontFamily: "Gilroy-SemiBold",
  fontStyle: "normal",
  fontDisplay: "block",
  fontWeight: 600,
  src: `
      local('Gilroy-SemiBold'),
      url(${GilroySemiBold}) format('ttf')
    `,
};
const gilorylightitalic = {
  fontFamily: "Gilroy-LightItalic",
  fontStyle: "italic",
  fontDisplay: "block",
  fontWeight: 600,
  src: `
      local('Gilroy-LightItalic'),
      url(${GilroyLightItalic}) format('ttf')
    `,
};
const gilorymedium = {
  fontFamily: "Gilroy-Medium",
  fontStyle: "normal",
  fontDisplay: "block",
  fontWeight: 600,
  src: `
      local('Gilroy-Medium'),
      url(${GilroyMedium}) format('ttf')
    `,
};

const arr = [
  giloryregular,
  gilorylight,
  gilorysemibold,
  gilorylightitalic,
  gilorymedium,
];

export default arr;
