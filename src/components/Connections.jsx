import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connection = () => {
  const connectionsList = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connections));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsList) return;
  if (connectionsList.length === 0)
    return (
      <h1 className="text-2xl sm:text-3xl font-semibold my-20 text-center">
        There are No Connections
      </h1>
    );

  return (
    <div className="flex flex-col justify-center items-center px-3 sm:px-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-10 mb-6 sm:my-8 text-center">
        Connections
      </h1>

      {connectionsList.map((eachConnection) => {
        const {
          _id,
          firstName,
          lastName,
          description,
          profileUrl,
          age,
          gender,
        } = eachConnection;

        return (
          <div
            key={_id}
            className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow duration-300 m-3 w-7/8 sm:w-4/5 lg:w-2/3"
          >
            <div className="card-body p-5 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 sm:w-3/4 text-center sm:text-left">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-full object-cover border-2 border-base-100 shadow mb-3 sm:mb-0"
                  src={profileUrl}
                  alt={`${firstName} ${lastName}`}
                />

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm sm:text-base text-gray-300">
                      {age + " years • " + gender}
                    </p>
                  )}
                  {description && (
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end w-full sm:w-auto">
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-secondary w-full sm:w-auto px-6 text-sm sm:text-base">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
