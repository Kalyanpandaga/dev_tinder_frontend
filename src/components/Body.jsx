import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUserProfile = async () => {
    try {
      const url = API_BASE_URL + "/profile/view";
      const respone = await axios.get(url, { withCredentials: true });
      const userData = respone.data.userData;
      dispatch(addUser(userData));
    } catch (err) {
      if (err.status === 401) {
        return navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUserProfile();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />
      <main className="flex-1 pt-16 pb-4 px-2 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
