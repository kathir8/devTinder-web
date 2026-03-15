import axios from "axios";
import { useState } from "react";

const Login = () => {

  const [emailId, setEmailId] = useState('akshay@gmail.com');
  const [password, setPassword] = useState('Akshay@123');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', { emailId, password }, { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
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
          <div className="card-actions justify-center">
            <div className="btn btn-primary" onClick={handleLogin}>Login</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login