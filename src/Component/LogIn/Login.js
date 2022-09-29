import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import User from "../../Models/User";
import { setCurrentUser } from "../../redux/actions/user";

const Login = () => {
  const [user, setUser] = useState(new User("", "", "", "", ""));
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate("/");
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.userId) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setMessage("Please fill out all input");
      return;
    }
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, user)
      .then((resp) => {
        setPending(true);
        dispatch(setCurrentUser(resp.data));

        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        setPending(true);
        setErrorMessage(true);
        if (error.response.status === 401) {
          setMessage("Email or password incorrect");
        }
        console.error(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage || message || pending) {
        setErrorMessage(null);
        setPending(false);
        setMessage("");
      }
    }, 5000);
  }, [errorMessage, message, pending]);

  return (
    <div className="signUp">
      <div className="signUp__wrapper container">
        <div className="signUp__content">
          <h2>Sign In</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <input
              type="email"
              value={user.email}
              name="email"
              required
              onChange={(e) => handleChange(e)}
              placeholder="Email"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />

             <p>{errorMessage}</p>
            <p>{message}</p>
            <button disabled={pending} type="submit">
              {pending ? (
                <div class="spinner-border text-white" role="status"></div>
              ) : (
                <>Sign Up</>
              )}
            </button>
            <Link to="/signUp">Don't have an Account? SignUp</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
