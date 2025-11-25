import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import SignUPHeader from "./components/SignUPHeader";

const AppLayout = () => {
  return (
    <Provider store={appStore}>
      <div>
        <Body />
      </div>
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
