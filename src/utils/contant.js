export const encryptionConst = {
  DEFAULT_SALT: process.env.REACT_APP_SALT,
};

export const chainId = process.env.REACT_APP_CHAIN_ID;

export const schema = {
  password: {
    length: {
      maximum: 20,
      minimum: 8,
      tooShort: "needs to have %{count} words or more",
    },
    format: {
      pattern:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#~`/|=)(?!@$%^&*-]).{8,}$/,
      message:
        "^ Password should be at least 8 characters and should contain lower case letter, upper case letter, number, special symbol.",
    },
  },
  confirmPassword: {
    length: {
      maximum: 20,
      minimum: 8,
      tooShort: "needs to have %{count} words or more",
    },
    equality: {
      attribute: "password",
      message: "^ Password and confirm password is not equal.",
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
      },
    },
  },
  policy: {
    // presence: { allowEmpty: true },
    // inclusion: {
    //   within: [true],
    //   message: "Required!",
    // },
  },
};

export const restorePasswordschema = {
  password: {
    length: {
      maximum: 20,
      minimum: 8,
      tooShort: "needs to have %{count} words or more",
    },
    format: {
      pattern:
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#~`/|=)(?!@$%^&*-]).{8,}$/,
      message:
        "^ Password should be at least 8 characters and should contain lower case letter, upper case letter, number, special symbol.",
    },
  },
  confirmPassword: {
    length: {
      maximum: 20,
      minimum: 8,
      tooShort: "needs to have %{count} words or more",
    },
    equality: {
      attribute: "password",
      message: "^ Password and confirm password is not equal.",
      comparator: function (v1, v2) {
        return JSON.stringify(v1) === JSON.stringify(v2);
      },
    },
  },
};

export const sendTransactionSchema = {
  reciverKey: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  senderKey: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 50,
    },
  },
  SMH: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 20,
    },
  },
  transactionType: {
    presence: { allowEmpty: false, message: "is required" },
  },
};
