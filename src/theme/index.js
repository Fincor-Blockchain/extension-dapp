import { createTheme } from "@material-ui/core";

import { palette } from "./pellete";
import { typography } from "./typography";
import { overrides } from "./overrides";
import { breakPoints } from "./breakPoints";
import arr from "./fontsConfig";

const theme = createTheme({
    palette,
    typography: {
        fontFamily: ["Gilroy"].join(","),
        "@App": {
            "@font-face": arr,
        },
        ...typography,
    },
    overrides: {
        MuiCssBaseline: {
            "@App": {
                "@font-face": arr,
            },
        },
        ...overrides,
    },
    breakPoints,
});

export default theme;

// import { createMuiTheme } from "@material-ui/core";

// import palette from "./palette";
// import typography from "./typography";
// import overrides from "./overrides";
// import breakpoints from "./breakpoints";
// import arr from "./fontsConfig";

// const theme = createMuiTheme({
//   palette,
//   typography: {
//     fontFamily: ["Graphik", "Metropolis"].join(","),
//     ...typography,
//   },
//   overrides: {
//     MuiCssBaseline: {
//       "@App": {
//         "@font-face": arr,
//       },
//     },
//     ...overrides,
//   },
//   breakpoints,
// });

// export default theme;
