import { Route, Routes, BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Requests from "./components/Requests";
import Body from "./components/Body";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Premium from "./components/premium";
import Chat from "./components/Chat";

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
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/premium" element={<Premium />} />
            <Route index path="/" element={<Feed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
