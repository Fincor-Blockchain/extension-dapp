import React, { lazy, Suspense, useEffect } from "react";
import {
    HashRouter,
    Switch,
    Route,
    // Redirect,
    // useHistory,
} from "react-router-dom";
import {
    SplashScreen,
    // CreateNewWallet,
    // TermsAndCondition,
    // Mnemonics,
    // MnemonicsTypes,
    Reciept,
    // AddToken,
    // AddCustomToken,
    // Swap,
    CreateAccount,
    Setting,
    // General,
    // Advance,
    // Contacts,
    Security,
    // Alert,
    // AddAccount,
    // Network,
    // ImportAccount,
    // Account,
    // Welcome,
    //   RestoreWallet,
    //     Word24Mnemonics,
    //     Word12Mnemonics,
    // RestorePassword,
    Transaction,
} from "./screens";
// import { AccessWallet } from "./screens/AccessWallet";
// import { AddNetwork, NetworkDetail } from "./screens/setting/network";
import { ConfirmSeedPhrase, SeedPhrase } from "./screens/setting/security";
// import { ConfirmSwap } from "./screens/swap";
// import Auth from "./Screens/auth";
import UnlockWallet from "./screens/auth/UnlockWallet/UnlockWallet";
import RestoreWallet from "./screens/auth/restoreWallet/RestoreWallet";
import FullPageLoader from "./components/FullPageLoader";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from "react-redux";
import ExtensionStore from "./utils/local-store";
import { setEncryptedData, setAddress } from "./redux/encryption/actions";
import { UnlockRestoreWallet } from "./screens/auth/unlockRestore";
import { activeIndex, setAccounts } from "./redux/wallet/actions";
// import { getEnvironmentType } from "./utils/utils";

const AccessWallet = lazy(() => import("./screens/AccessWallet/AccessWallet"));
const Account = lazy(() => import("./screens/account/Account"));
const Auth = lazy(() => import("./screens/auth"));

// const app = [
//   {
//     path: "/",
//     component: SplashScreen,
//   },
//   {
//     path: "/access-wallet",
//     component: AccessWallet,
//   },
//   {
//     path: "/create-wallet",
//     component: Auth,
//   },
//   {
//     path: "/unlock-wallet",
//     component: UnlockWallet,
//   },
//   {
//     path: "/restore-wallet",
//     component: RestoreWallet,
//   },
//   {
//     path: "/dashboard",
//     component: Account,
//   },
//   // {
//   //   path: "/accountDetail",
//   //   component: AccountDetail,
//   // },
//   {
//     path: "/reciept",
//     component: Reciept,
//   },
//   {
//     path: "/addToken",
//     component: AddToken,
//   },
//   {
//     path: "/addCustomToken",
//     component: AddCustomToken,
//   },
//   {
//     path: "/swap",
//     component: Swap,
//   },
//   // {
//   //     path: "/createAccount",
//   //     component: CreateAccount,
//   // },
//   // {
//   //     path: "/welcome",
//   //     component: Welcome,
//   // },
//   {
//     path: "/importAccount",
//     component: ImportAccount,
//   },
//   {
//     path: "/setting",
//     component: Setting,
//   },
//   {
//     path: "/general",
//     component: General,
//   },
//   {
//     path: "/advance",
//     component: Advance,
//   },
//   {
//     path: "/contacts",
//     component: Contacts,
//   },
//   {
//     path: "/security&privacy",
//     component: Security,
//   },
//   {
//     path: "/alert",
//     component: Alert,
//   },
//   {
//     path: "/network",
//     component: Network,
//   },
//   {
//     path: "/addAccount",
//     component: AddAccount,
//   },
//   {
//     path: "/phrase",
//     component: SeedPhrase,
//   },
//   {
//     path: "/confirmSeedPhrase",
//     component: ConfirmSeedPhrase,
//   },
//   {
//     path: "/addNetwork",
//     component: AddNetwork,
//   },
//   {
//     path: "/networkDetail",
//     component: NetworkDetail,
//   },
//   {
//     path: "/confirmSwap",
//     component: ConfirmSwap,
//   },
// ];

// const routes = {
//     app,
// };

// export default routes;

// import MainLayout from "./layouts/MainLayout";
// import SplashScreen from "./views/SplashScreen/SplashScreen";
// import AccessMyWallet from "./views/AccessMyWallet";
// import NotFound from "./components/NotFound";

// import FullPageLoader from "./components/FullPageLoader";
// import { lockWalletHandler, logout } from "./actions";

// const WalletCreateForm = lazy(() => import("./views/WalletCreateForm"));
// const Send = lazy(() => import("./views/Send"));
// const Request = lazy(() => import("./views/Request"));
const Transactions = lazy(() => import("./screens/transaction/transaction"));
// const ImportMyWallet = lazy(() => import("./views/ImportMyWallet"));
// creating browser history

function noop() {}
(() => {
    if (process.env.NODE_ENV !== "development") {
        console.log = noop;
        console.warn = noop;
        console.error = noop;
    }
})();
const AppRoutes = () => {
    const dispatch = useDispatch();

    // // const history = useHistory();
    // const [state, setstate] = useState(false);
    // const { loggedIn } = useSelector((state) => state.auth);
    // const confirmExit = (e) => {
    //   dispatch(lockWalletHandler());
    // };

    // useEffect(() => {
    //   if (loggedIn) {
    //     if (state == true) {
    //       window.onbeforeunload = confirmExit();
    //     } else {
    //       setstate(true);
    //     }
    //   } else {
    //     window.onbeforeunload = false;
    //   }

    //   return () => {};
    // }, [state]);

    useEffect(() => {
        if (ExtensionStore.isSupported) {
            ExtensionStore.get().then((data) => {
                const encryptedData = data?.encryptedData;
                const address = data?.address;
                const accounts = data?.accounts;
                const activeItemIndex = data?.activeItemIndex;
                if (data) {
                    if (encryptedData) dispatch(setEncryptedData(encryptedData));
                    if (address) dispatch(setAddress(address));
                    if (accounts) dispatch(setAccounts(accounts));
                    if (activeItemIndex) dispatch(activeIndex(activeItemIndex));
                }
            });
        }
    }, [dispatch]);

    return (
        <HashRouter>
            <Suspense fallback={<FullPageLoader isActive={true} />}>
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    {/* {loggedIn ? <SplashScreen /> : <SplashScreen />} */}
                    {/* </Route> */}
                    <Route path="/access-wallet" component={AccessWallet} />
                    <Route path="/create-wallet" component={Auth} />
                    <Route path="/unlock-wallet" component={UnlockWallet} />
                    <Route path="/restore-wallet" component={RestoreWallet} />
                    <Route path="/restore-phrase" component={UnlockRestoreWallet} />
                    <Route path="/transaction" component={Transaction} />
                    <Route path="/security&privacy" component={Security} />
                    <Route path="/backupReveal" component={ConfirmSeedPhrase} />
                    <Route path="/backupPassword" component={SeedPhrase} />
                    <Route path="/create-account" component={CreateAccount} />
                    <PrivateRoute path="/dashboard" component={Account} />
                    <PrivateRoute path="/send" component={Reciept} />
                    {/* <PrivateRoute path="/request" component={Request} /> */}
                    {/* <PrivateRoute path="/import-my-wallet" component={ImportMyWallet} /> */}
                    <PrivateRoute path="/setting" component={Setting} />
                    <PrivateRoute exact path="/txs" component={Transactions} />
                    {/* <Redirect to="/not-found" /> */}
                </Switch>
            </Suspense>
        </HashRouter>
    );
};

export default AppRoutes;
