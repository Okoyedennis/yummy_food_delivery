import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import User from "../../Models/User";
import "./SignUp.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState(new User("", "", "", "", "", "", ""));
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [pending, setPending] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setPending(true);


    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.username ||
      !user.password
    ) {
      setMessage("Please fill out all input");
      return;
    }

        if (user.password !== confirmPassword) {
          setMessage("Please reconfirm your password");
          return;
        }
      

    axios
      .post(`${BASE_URL}/signup`, user)
      .then((resp) => {
             setTimeout(() => {
               if (resp.status === 200) {
                 toast.success("Signup Successful.", {
                   position: "top-right",
                   autoClose: 4000,
                   hideProgressBar: true,
                   closeOnClick: true,
                   pauseOnHover: true,
                   draggable: true,
                   progress: undefined,
                 });
               }
             }, 2000);
        
           setTimeout(() => {
              navigate("/login");
           }, 4000);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (errorMessage || message || pending) {
        setErrorMessage(null);
        setPending(false)
        setMessage("");
      }
    }, 5000);
  }, [errorMessage, message, pending]);

  return (
    <div className="signUp">
       <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <div className="signUp__wrapper container">
        <div className="signUp__content">
          <h2>Register</h2>
          <form onSubmit={(e) => handleRegister(e)}>
            <input
              type="text"
              placeholder="FirstName"
              value={user.firstName}
              name="firstName"
              required
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="LastName"
              value={user.lastName}
              name="lastName"
              required
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
            <select
              value={user.gender}
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option selected>Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
           <p>{errorMessage}</p>
         <p>{message}</p>
            <button disabled={pending} type="submit">
              {pending ? (
                <div class="spinner-border text-white" role="status"></div>
              ) : (
                <span class="sr-only">Sign Up</span>
              )}
            </button>
            <Link to="/logIn">Already have an Account? Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
