import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constants";

const Connections = () => {

    const dispatch = useDispatch();

    const connections = useSelector((state) => state.connections);


    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0) return <h1 className="flex justify-center my-10"> No Connections found</h1>

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl">Connections</h1>
            {connections.map((connection) => {

                const { firstName, lastName, photoUrl, age, gender, about, _id } = connection;

                return (
                    <div key={_id} className="flex m-4 p-4 border rounded-lg bg-base-300 w-1/2 mx-auto">
                        <div>
                            <img src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="profile" className="w-20 h-20 rounded-full object-cover" />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{firstName + ' ' + lastName}</h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )


            })}
        </div>
    )
}

export default Connections