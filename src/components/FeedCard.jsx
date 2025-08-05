import React from "react";
import { API_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const FeedCard = (props) => {
  const dispatch = useDispatch();
  const { feed } = props;
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    profileUrl,
    description,
    skills = [],
  } = feed;
  const ageText = age ? `${age} years, ` : "";

  const handleSendRequest = (status) => {
    try {
      const url = API_BASE_URL + "/request/send/" + status + "/" + _id;
      axios.post(url, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const onClickInterested = () => {
    const status = "interested";
    handleSendRequest(status);
  };

  const onClickIgnore = () => {
    const status = "ignored";
    handleSendRequest(status);
  };
  return (
    <div className="card bg-base-300 w-80 shadow-sm px-5">
      <figure className="mt-4">
        <img src={profileUrl} alt="feed profile url" className="w-60 h-60" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <span className="mb-2">{description}</span>
        <span className="mb-2">
          {ageText} {gender}
        </span>
        {skills.length > 0 && (
          <div>
            <p className="text-sm font-semibold"> Skills </p>
            <div className="flex flex-wrap gap-2 mt-2 items-center">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-emerald-800 text-xs font-semibold p-2 py-1 rounded-full flex items-center gap-2"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="card-actions justify-center my-5 gap-5">
          <button className="btn btn-primary" onClick={onClickInterested}>
            Intrested
          </button>
          <button className="btn btn-secondary" onClick={onClickIgnore}>
            Ignored
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
