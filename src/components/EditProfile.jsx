import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (props) => {
  const { user } = props;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [description, setDescription] = useState(user.description || "");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(user.skills || []);
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
        skills,
      };
      const response = await axios.put(
        API_BASE_URL + "/profile/edit",
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

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row my-10 gap-5 justify-center items-center md:items-stretch">
        <div>
          <div className="card bg-base-100 w-90 shadow-sm flex-1">
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
                <legend className="text-xs fieldset-legend">Age:</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </fieldset>
              <label className="text-xs fieldset-legend">Gender:</label>
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
              <div>
                <label className="block mb-1 font-semibold">
                  Skills (max 10)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter"
                        ? (e.preventDefault(), addSkill())
                        : null
                    }
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter a skill and press Enter"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-emerald-800 text-xs font-semibold p-2 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>
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

        <div className="flex-1 max-w-md flex">
          <FeedCard
            feed={{
              firstName,
              lastName,
              profileUrl,
              gender,
              age,
              description,
              skills,
            }}
          />
        </div>

        {showProfileUpdateMsg && (
          <div className="toast toast-top toast-center z-[9999]">
            <div className="alert alert-success">
              <span>Profile Updated Successfully.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfile;
