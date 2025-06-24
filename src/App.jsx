import { Route, Routes, BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Body from "./components/Body";
import Feed from "./components/feed";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route index path="/" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
