import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUserProfile = async () => {
    try {
      const url = BASE_URL + "/profile/view";
      const respone = await axios.get(url, { withCredentials: true });
      const userData = respone.data.userData;
      dispatch(addUser(userData));
    } catch (err) {
      console.log("errrr", err);
      if (err.status === 401) {
        return navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
