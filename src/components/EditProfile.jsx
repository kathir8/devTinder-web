import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from './UserCard';

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [gender, setGender] = useState(user.gender);
    const [age, setAge] = useState(user.age);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState('');
    const [toastMessage, setToastMessage] = useState('');

    const dispatch = useDispatch();
    const saveProfile = async () => {
        setError('');
        try {
            const res = await axios.patch(BASE_URL + '/profile/edit', { lastName, photoUrl, age, gender, about }, { withCredentials: true })
            dispatch(addUser(res?.data?.data));
            setToastMessage(true);
            setTimeout(() => {
                setToastMessage(false);
            }, 3000);
        } catch (err) {
            setError(err.response?.data || err.message || 'Something went wrong')
        }
    }
    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit profile</h2>
                            <div>
                                <p>Email : {user.emailId}</p>
                                <p>First Name : {user.firstName}</p>

                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Last Name</legend>
                                    <input type="text" className="input" placeholder="Type here"
                                        value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </fieldset>

                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Photo url</legend>
                                    <input type="text" className="input" placeholder="Type here"
                                        value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                                </fieldset>


                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Gender</legend>
                                    <input type="text" className="input" placeholder="Type here"
                                        value={gender} onChange={(e) => setGender(e.target.value)} />
                                </fieldset>

                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">Age</legend>
                                    <input type="text" className="input" placeholder="Type here"
                                        value={age} onChange={(e) => setAge(e.target.value)} />
                                </fieldset>

                                <fieldset className="fieldset my-2">
                                    <legend className="fieldset-legend">About</legend>
                                    <textarea className="input" placeholder="Type here"
                                        value={about} onChange={(e) => setAbout(e.target.value)} />
                                </fieldset>
                            </div>
                            <div className="card-actions justify-center">
                                <div className="btn btn-primary" onClick={saveProfile}>Save profile</div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} fromProfile={true} />
            </div>
            {toastMessage &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Message sent successfully.</span>
                    </div>
                </div>}
        </>
    )
}

export default EditProfile