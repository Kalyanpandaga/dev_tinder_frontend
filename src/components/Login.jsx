import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("shahid.shaik@gmail.com");
  const [password, setPassword] = useState("Shahid@shaik123");
  const [errorMsg, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEmailId = (e) => {
    setEmailId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onSumbitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url = BASE_URL + "/login";
      const loginData = { emailId, password };
      const response = await axios.post(url, loginData, {
        withCredentials: true,
      });

      const userData = await response.data.userData;
      dispatch(addUser(userData));
      return navigate("/");
    } catch (err) {
      console.log(err);
      const errorMessage = await err.response.data.error;
      setErrorMessage(errorMessage);
    }
  };
  return (
    <div className="flex justify-center my-15">
      <div className="card bg-base-200 w-96 shadow-sm">
        <form className="card-body" onSubmit={onSumbitLogin}>
          <h2 className="card-title m-auto"> Login Page </h2>
          <fieldset className="fieldset">
            <legend className="text-xs fieldset-legend">Email Id: </legend>
            <input
              type="text"
              className="input"
              placeholder="Enter Your Email"
              value={emailId}
              onChange={onChangeEmailId}
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="text-xs fieldset-legend">Password: </legend>
            <input
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </fieldset>
          <div className="card-actions justify-center mt-5">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          {errorMsg && <p className="text-warning"> * {errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
