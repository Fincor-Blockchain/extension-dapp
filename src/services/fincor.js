const cuspstakejs = require("@libonomy/cuspstakejs");

const chainId = process.env.REACT_APP_CHAIN_ID;
const fincor = cuspstakejs.network(process.env.REACT_APP_SERVER_URL, chainId);
fincor.setPath("m/44'/118'/0'/0/0");
fincor.setBech32MainPrefix("fincor");
module.exports = fincor;
