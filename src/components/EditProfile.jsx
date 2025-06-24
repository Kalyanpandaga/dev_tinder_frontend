import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (props) => {
  const { user } = props;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [description, setDescription] = useState(user.description);
  const [errorMsg, setErrorMessage] = useState("");
  const [showProfileUpdateMsg, setShowProfileUpdateMsg] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const updatedData = {
        firstName,
        lastName,
        profileUrl,
        age,
        gender,
        description,
      };
      const response = await axios.put(
        BASE_URL + "/profile/edit",
        updatedData,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response?.data?.updatedData));
      setShowProfileUpdateMsg(true);
      setTimeout(() => {
        setShowProfileUpdateMsg(false);
      }, 3000);
    } catch (e) {
      setErrorMessage(e?.response?.data || e?.message);
    }
  };

  return (
    <>
      <div className="flex my-20 justify-center gap-5">
        <div className="flex justify-center">
          <div className="card bg-base-200 w-96 shadow-sm">
            <form className="card-body" onSubmit={saveProfile}>
              <h2 className="card-title m-auto"> Edit Profile </h2>
              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend">First Name:</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend">Last Name:</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend">
                  Profile Url:
                </legend>
                <input
                  type="text"
                  className="input"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="text-xs fieldset-legend"> Age: </legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </fieldset>
              <label className="text-xs fieldset-legend"> Gender: </label>
              <select
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
                className="select"
                required
              >
                <option value="" disabled>
                  Select a gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <label className="text-xs fieldset-legend">Description:</label>
              <textarea
                className="textarea"
                placeholder="Bio"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <div className="card-actions justify-center mt-5">
                <button type="submit" className="btn btn-primary">
                  Save Profile
                </button>
              </div>
              {errorMsg && <p className="text-warning"> * {errorMsg}</p>}
            </form>
          </div>
        </div>
        <FeedCard
          feed={{ firstName, lastName, profileUrl, gender, age, description }}
        />
      </div>
      {showProfileUpdateMsg && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Updated Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
