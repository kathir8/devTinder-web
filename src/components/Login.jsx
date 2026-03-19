import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Login = () => {

  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {

    validateCredentials();
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

  const handleSignUp = async () => {
    try {
      validateSignup();
      if (error) return;
      const res = await axios.post(`${BASE_URL}/signup`, {firstName, lastName, emailId, password}, {withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate('/profile');

    } catch (err) {
      setError(err.response?.data || "Sign up failed. Please try again.");
      console.error(err);
    }
  }

  const validateSignup = () => {
    if (!firstName || !lastName) {
      setError("First name and Last name are required.");
      return;
    }
    validateCredentials();
  }

  const validateCredentials = () => {
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
          <h2 className="card-title justify-center">{isLoginForm ? 'Login' : 'Sign Up'}</h2>
          <div>
            {!isLoginForm && <>
              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">First name</legend>
                <input type="text" className="input" placeholder="Type here"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </fieldset>

              <fieldset className="fieldset my-2">
                <legend className="fieldset-legend">Last name</legend>
                <input type="text" className="input" placeholder="Type here"
                  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </fieldset>
            </>}

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
            <div className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? 'Login' : 'Sign Up'}</div>
          </div>
          <div className="text-center cursor-pointer underline" onClick={() => setIsLoginForm(!isLoginForm)}> Go to {isLoginForm ? 'Sign Up' : 'Login'}</div>
        </div>
      </div>
    </div>
  )
}

export default Login