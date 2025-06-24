import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionRequests } from "../utils/requestSlice";

const Requests = () => {
  const connectionRequestsList = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addConnectionRequests(res.data.connectionRequests));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConnectionRequests();
  }, []);

  if (!connectionRequestsList) return;
  if (connectionRequestsList.length === 0)
    return (
      <h1 className="text-5xl text-center">There are No Connection Requests</h1>
    );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl my-5"> Connection Requests </h1>
      {connectionRequestsList.map((eachRequest) => {
        const {
          _id,
          firstName,
          lastName,
          description,
          profileUrl,
          age,
          gender,
        } = eachRequest.fromUserId;

        return (
          <div
            className="w-1/2 flex bg-base-300 m-3 px-2 py-4 items-center justify-between"
            key={_id}
          >
            <div className="mx-2">
              <img
                className="w-20 h-20 rounded-full"
                src={profileUrl}
                alt="profile"
              />
            </div>
            <div className="">
              <h1 className="text-xm text-white ">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p> {age + " years " + gender} </p>}
              <p> {description} </p>
            </div>
            <div>
              <button className="btn btn-active btn-accent mx-2">Accept</button>
              <button className="btn btn-active btn-warning  mx-2">
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
