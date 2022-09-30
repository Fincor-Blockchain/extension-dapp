import * as bip39 from "bip39";

const fromHexString = (hexString) => {
  const bytes = [];
  for (let i = 0; i < hexString.length; i += 2) {
    bytes.push(parseInt(hexString.slice(i, i + 2), 16));
  }
  return Uint8Array.from(bytes);
};

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");

class CryptoService {
  static generateMnemonic = () => bip39.generateMnemonic();

  /**
   * Generates new master key pair using as seed 12 words mnemonic (128 bits of entropy) as per BIP39.
   * Inside call to function "generateKeyPair" is made - it's exposed from compiled WASM and generates keys following ed25519 protocol
   * @return {{secretKey: Uint8Array[64], publicKey: Uint8Array[32]}}
   */
  static generateKeyPair = ({ mnemonic }) => {
    // Generate 64 seed bytes (512 bits) from phrase - this is a wallet's master seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    let publicKey = new Uint8Array(32);
    let secretKey = new Uint8Array(64);
    const saveKeys = (pk, sk) => {
      if (pk === null || sk === null) {
        this.stopAndCleanUp();
        throw new Error("key generation failed");
      }
      publicKey = pk;
      secretKey = sk;
    };
    global.__generateKeyPair(seed, saveKeys); // eslint-disable-line no-undef
    return {
      publicKey: toHexString(publicKey),
      secretKey: toHexString(secretKey),
    };
  };

  /**
   *
   * @param mnemonic {string}
   * @param index {int}
   * @return {{secretKey: Uint8Array[64], publicKey: Uint8Array[32]}}
   */


  /**
   * Serializes and signs transaction to be sent to node.
   * @param secretKey - string
   * @param accountNonce - account's next nonce value
   * @param receiver - receiver's address
   * @param price - fee in SMC cents
   * @param amount - amount to transfer in SMC cents
   * @return {Promise} when resolved returns signature as Uint8Array(64)
   */


  /**
   * Signs message to be sent to node.
   * @param secretKey - string
   * @param message - utf8 string representation of message
   * @return {Promise} when resolved returns signature as Uint8Array(64)
   */
  static signMessage = ({ message, secretKey }) => {
    const sk = fromHexString(secretKey);
    return new Promise((resolve) => {
      const enc = new TextEncoder();
      const messageAsUint8Array = enc.encode(message);
      // eslint-disable-next-line no-undef
      global.__signTransaction(sk, messageAsUint8Array, (sig) => {
        resolve(toHexString(sig));
      });
    });
  };

  /**
   * @param mnemonic - string to be validated as mnemonic per BIP39 standard.
   * @return {*|boolean} true if string is a valid mnemonic, false else.
   */
  static validateMnemonic = (mnemonic) => {
    if (!mnemonic || !mnemonic.length) {
      return false;
    }
    return bip39.validateMnemonic(mnemonic);
  };
}

export default CryptoService;
