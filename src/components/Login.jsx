import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {

  const [emailId, setEmailId] = useState('akshay@gmail.com');
  const [password, setPassword] = useState('Akshay@123');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {

    validateLogin();
    if (error) return;
    try {
      const res = await axios.post(`${BASE_URL}/login`, { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (err) {
      setError(err.response?.data || "Login failed. Please try again.");
      console.error(err);
    }
  }

  const validateLogin = () => {
    if (!emailId || !password) {
      setError("Email and password are required.");
      return;
    }
    setError('');
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email ID</legend>
              <input type="text" className="input" placeholder="Type here"
                value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" placeholder="Type here"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <div className="btn btn-primary" onClick={handleLogin}>Login</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login