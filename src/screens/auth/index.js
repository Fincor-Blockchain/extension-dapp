import React, { useState } from "react";
import { CreatePassword } from "./CreatePassword";
import { TermsAndCondition } from "./termsAndCondition";
import { Mnemonics } from "./mnemonics";
import { MnemonicsTypes } from "./mnemonicsTypes";

const CreateWallet = () => {
    const [state, setState] = React.useState({
        isValid: false,
        values: {},
        touched: {
            policy: false,
            password: "",
            confirmPassword: "",
        },
        errors: {},
    });
    const [screen, setScreen] = useState(0);

    return (
        <div>
            {screen === 0 ? (
                <TermsAndCondition state={state} setState={setState} setScreen={setScreen} />
            ) : screen === 1 ? (
                <CreatePassword state={state} setState={setState} setScreen={setScreen} />
            ) : screen === 2 ? (
                <Mnemonics setScreen={setScreen} />
            ) : screen === 3 ? (
                <MnemonicsTypes password={state.values.password} setScreen={setScreen} />
            ) : (
                ""
            )}
        </div>
    );
};

export default CreateWallet;
