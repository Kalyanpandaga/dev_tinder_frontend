import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    try {
      const url = API_BASE_URL + "/logout";
      await axios.post(url, {}, { withCredentials: true });
      dispatch({ type: "RESET_APP" });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 fixed top-0 left-0 right-0 shadow-md z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl sm:text-xl mx-5 flex items-center gap-2"
        >
          🧑‍💻 Dev Tinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2 mx-5">
          <p className="p-4 text-white font-medium">{user.firstName}</p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img alt="user profile" src={user.profileUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/premium" className="justify-between">
                  Premium
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="border-none bg-transparent"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
