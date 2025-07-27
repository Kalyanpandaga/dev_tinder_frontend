import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    user && (
      <>
        <div
          className="my-5 flex gap-2 items-center cursor-pointer"
          onClick={handleBack}
        >
          <IoArrowBackCircle
            size={36}
            className="text-blue-600 hover:text-blue-800"
          />
          <span className="text-sm font-medium text-blue-600">
            Back to Home
          </span>
        </div>

        <div className="mb-10">
          <EditProfile user={user} />
        </div>
      </>
    )
  );
};

export default Profile;
