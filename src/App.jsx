import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Testing from "./components/Testing";
import Body from "./components/Body";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route index path="/" element={<Testing />} />
      </Route>
    </Routes>
  );
}

export default App;
