import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeedData = async () => {
    try {
      const url = BASE_URL + "/user/feed";
      const response = await axios.get(url, { withCredentials: true });
      const feedData = response?.data?.feedData;
      dispatch(addFeed(feedData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  if (!feedData) return;

  if (feedData.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-white text-2xl my-2">
          Currently there are no suggestions for you.
        </h1>
        <p className="text-white text-xl"> please wait some time. </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-10">
      {feedData && <FeedCard feed={feedData[0]} />}
    </div>
  );
};

export default Feed;
