import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("kalyan@gmail.com");
  const [password, setPassword] = useState("Kalyan@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginFrom] = useState(true);
  const [errorMsg, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginForm) {
      setEmailId("");
      setPassword("");
    }
  }, [isLoginForm]);

  const onChangeEmailId = (e) => {
    setEmailId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onSumbitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url = API_BASE_URL + "/login";
      const loginData = { emailId, password };
      const response = await axios.post(url, loginData, {
        withCredentials: true,
      });
      const userData = response.data.userData;
      dispatch(addUser(userData));
      return navigate("/");
    } catch (err) {
      const errorMessage = await err.response.data.error;
      setErrorMessage(errorMessage);
    }
  };

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url = API_BASE_URL + "/signup";
      const response = await axios.post(
        url,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      const userData = response.data.userData;
      dispatch(addUser(userData));
      navigate("/profile");
    } catch (err) {
      const errorMessage = await err.response.data.error;
      setErrorMessage(errorMessage);
    }
  };
  return (
    <div className="flex justify-center my-15">
      <div className="card bg-base-100 w-96 shadow-sm">
        <form
          className="card-body"
          onSubmit={isLoginForm ? onSumbitLogin : onSubmitSignUp}
        >
          <h2 className="card-title m-auto">
            {isLoginForm ? " Login Page" : "Sign Up Page"}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={onChangeFirstName}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend">Last Name </legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={onChangeLastName}
                  required
                />
              </fieldset>
            </>
          )}
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
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              required
            />
          </fieldset>
          <div className="card-actions justify-center mt-5">
            <button type="submit" className="btn btn-primary">
              {isLoginForm ? "Login" : "Sing Up"}
            </button>
          </div>
          {errorMsg && <p className="text-warning"> * {errorMsg}</p>}
          <p
            className="text-center my-4 cursor-pointer text-blue-400"
            onClick={() => setIsLoginFrom(!isLoginForm)}
          >
            {isLoginForm
              ? "You have no account, Sign up"
              : "You have an account, Login"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
