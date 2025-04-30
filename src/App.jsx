import { Route, Routes, BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Testing from "./components/Testing";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import Feed from "./components/feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/testing" element={<Testing />} />
            <Route index path="/" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
