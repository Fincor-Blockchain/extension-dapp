import AppRoutes from "../src/routes";
import { Scrollbars } from "react-custom-scrollbars-2";

function App() {
  return (
    <div>
      <Scrollbars style={{ minHeight: "100vh" }} autoHide>
        <AppRoutes />
      </Scrollbars>
    </div>
  );
}

export default App;
