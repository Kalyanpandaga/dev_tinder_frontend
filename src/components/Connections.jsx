import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connection = () => {
  const connectionsList = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
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
      <h1 className="text-3xl my-24 text-center"> There are No Connections </h1>
    );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl my-5"> Connections </h1>
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
            className="w-1/3 flex bg-base-300 m-3 p-4 items-center"
            key={_id}
          >
            <div className="mx-2">
              <img
                className="w-20 h-20 rounded-full"
                src={profileUrl}
                alt="profile"
              />
            </div>
            <div className="w-4/5 mx-2">
              <h1 className="text-xm text-white ">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p> {age + " years " + gender} </p>}
              <p> {description} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connection;
