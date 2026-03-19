import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, fromProfile }) => {
    const { firstName, lastName, about, profileImage, age, gender, _id } = user;

    const dispatch = useDispatch();

    const sendRequest = async (status, id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${id}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(id));
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={profileImage || "https://cdn.vectorstock.com/i/250p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.avif"}
                    alt="profile-pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + ' ' + lastName}</h2>
                {age && gender && <p>{age}, {gender}</p>}
                <p>{about || "A card component has a figure, a body part, and inside body there are title and actions parts"}</p>
                {!fromProfile && <div className="card-actions justify-end">
                    <div className="btn btn-primary" onClick={() => sendRequest('ignored', _id)}>Ignore</div>
                    <div className="btn btn-secondary" onClick={() => sendRequest('interested', _id)}>Interested</div>
                </div>}
            </div>
        </div>
    )
}

export default UserCard
