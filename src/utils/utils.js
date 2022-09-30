import extention from "cross-browser-extension-manager";

const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) console.log("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

const denomToSymbol = (denom) => {
  const symbol = denom.replace("f", "").toUpperCase() || "";
  return symbol;
};

const NumberFormat = (value, numberOfDecimals = 3) => {
  const numberValue = Number(value);
  return numberValue.toLocaleString(undefined, {
    minimumFractionDigits: numberOfDecimals,
    maximumFractionDigits: numberOfDecimals,
  });
};

const getEnvironmentType = (url = window.location.href) => {
  const parsedUrl = new URL(url);

  if (parsedUrl.search === "") {
    return "POPUP";
  }
  return "FULLSCREEN";
};

/**
 * Returns an Error if extension.runtime.lastError is present
 * this is a workaround for the non-standard error object that's used
 * @returns {Error|undefined}
 */
function checkForError() {
  const { lastError } = extention.runtime;
  if (!lastError) {
    return undefined;
  }
  // if it quacks like an Error, its an Error
  if (lastError.stack && lastError.message) {
    return lastError;
  }
  // repair incomplete error object (eg chromium v77)
  return new Error(lastError.message);
}
export {
  getRandom,
  denomToSymbol,
  NumberFormat,
  getEnvironmentType,
  checkForError,
};
