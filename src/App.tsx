import "./App.css";
import { MainView } from "./MainView";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (<Provider store={store}>
    <div>
      <MainView />
    </div>
  </Provider>);
}

export default App;
