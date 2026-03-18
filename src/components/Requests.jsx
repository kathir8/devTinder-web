import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {

  const dispatch = useDispatch();

  const requests = useSelector((state) => state.requests);

  const reviewRequest = async (status, _id) => {

    try {
      const res = await axios.patch(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));

    } catch (err) {
      console.error(err);
    }
  }


  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));

    } catch (err) {
      console.error(err);

    }
  }


  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) return <h1 className="flex justify-center my-10"> No Requests found</h1>

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Requests</h1>
      {requests.map((request) => {

        const { firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

        return (
          <div key={request._id} className="flex justify-between items-center m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="profile" className="w-20 h-20 rounded-full object-cover" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + ' ' + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <div className="btn btn-primary mx-2" onClick={() => reviewRequest('rejected', request._id)}>Reject</div>
              <div className="btn btn-secondary mx-2" onClick={() => reviewRequest('accepted', request._id)}>Accept</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Requests