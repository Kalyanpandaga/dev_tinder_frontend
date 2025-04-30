import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {
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

  const feedData = useSelector((store) => store.feed);

  return (
    <div className="flex justify-center p-10">
      {feedData && <FeedCard feed={feedData[0]} />}
    </div>
  );
};

export default Feed;
