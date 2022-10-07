const cuspstakejs = require("@libonomy/cuspstakejs");

const chainId = process.env.REACT_APP_CHAIN_ID;
const Fincor = cuspstakejs.network(process.env.REACT_APP_SERVER_URL, chainId);
Fincor.setPath("m/44'/118'/0'/0/0");
Fincor.setBech32MainPrefix("fincor");
module.exports = Fincor;
