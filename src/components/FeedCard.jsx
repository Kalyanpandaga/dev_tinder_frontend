import React from "react";

const FeedCard = (props) => {
  const { feed } = props;
  const { firstName, lastName, age, gender, profileUrl, description } = feed;
  const ageText = age ? `${age} years, ` : "";
  return (
    <div className="card bg-base-300 w-80 shadow-sm px-5">
      <figure className="mt-4">
        <img src={profileUrl} alt="feed profile url" className="w-60" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <span className="mb-2">{description}</span>
        <span className="mb-2">
          {ageText} {gender}
        </span>
        <div className="card-actions justify-center my-5 gap-5">
          <button className="btn btn-primary">Intrested </button>
          <button className="btn btn-secondary">Ignored </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
