import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';// Import the custom hook

const LOGIN_URL = 'http://localhost:2000/auth/login';

const Login = () => {
  const navigate = useNavigate();
  // const { setAuth } = useContext(AuthContext); // Assuming AuthContext provides setAuth
  const { auth,setAuth } = useAuth(); // 

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: email, // Include the email field in the request
        username: user,
        password: pwd,

      });

      const userExist = response.data;
      // const userID = userExist._id.$oid;
      console.log('Response:', userExist.email); // Log the entire response to the console

      if (userExist) {
        const userID = userExist._id; // Extract the user ID directly as a string
        console.log('Response:', userExist); // Log the entire response to the console

        console.log('Extracted userID:', userID); // Log the userID to the console

        setAuth({
          email,
          user,
          role: userExist.role,
          userId: userID, // Include the user ID in the authentication state
        });
        console.log("auth show off",auth.email);

        // setAuth({ user, role: userExist.role }); // Set the user and role based on the response data
        axios.defaults.headers.common['token'] = userID;//zyeda

        // setAuth({ user, pwd }); // Set the user object based on your response data
        navigate('/'); // Navigate to the default route after successful login
      } else {
        setErrMsg('Invalid Credential');
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Invalid Credential');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

{/* email */}
<label htmlFor="email">Email:</label>
<input
  type="email" // Use the email input type for better validation
  id="email"
  onChange={(e) => setEmail(e.target.value)}
  value={email}
  required
/>

{/* email */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button className="add-task-button">Sign In</button>
      </form>
      <p>
        Need an Account?<br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
