import { Provider } from "react-redux";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import store from "./utils/store";


function App() {

  return (
    <>
    <Provider store={store}>
      <Layout/>
    </Provider>
    </>
  );
}

export default App;
