import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionRequests } from "../utils/requestSlice";

const Requests = () => {
  const connectionRequestsList = useSelector(
    (store) => store.connectionRequests
  );
  const dispatch = useDispatch();

  const fetchConnectionRequests = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/requests/recieved", {
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
      <h1 className="text-2xl sm:text-3xl font-semibold text-center my-20">
        There are No Connection Requests
      </h1>
    );

  return (
    <div className="flex flex-col justify-center items-center px-3 sm:px-6">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-10 sm:my-8 text-center">
        Connection Requests
      </h1>

      {/* Requests List */}
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

        const requestReviewed = async (status) => {
          try {
            const requestId = eachRequest._id;
            const url = `${API_BASE_URL}/request/review/${status}/${requestId}`;
            await axios.patch(url, {}, { withCredentials: true });
            fetchConnectionRequests();
          } catch (err) {
            console.log(err);
          }
        };

        const onClickReject = () => {
          requestReviewed("rejected");
        };

        const onClickAccept = () => {
          requestReviewed("accepted");
        };

        return (
          <div
            key={_id}
            className="card bg-base-300 shadow-md hover:shadow-lg transition-shadow duration-300 m-3 w-full max-w-md sm:max-w-lg lg:max-w-2xl"
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

              <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end gap-3 w-full sm:w-auto">
                <button
                  className="btn btn-accent w-1/2 sm:w-auto text-sm sm:text-base"
                  onClick={onClickAccept}
                >
                  Accept
                </button>
                <button
                  className="btn btn-warning w-1/2 sm:w-auto text-sm sm:text-base"
                  onClick={onClickReject}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
