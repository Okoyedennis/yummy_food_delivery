import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import User from "../../Models/User";
import { setCurrentUser } from "../../redux/actions/user";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [user, setUser] = useState(new User("", "", "", "", ""));
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
      return;
    }
    axios
      .post(`${BASE_URL}/api/v1/auth/login`, user)
      .then((resp) => {
        setPending(true);
        dispatch(setCurrentUser(resp.data));

         setTimeout(() => {
           if (resp.status === 200) {
              toast.success("Login Successful.", {
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
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        setPending(true);
        if (error.response.status === 401) {
              toast.error("Email or password incorrect.", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        } else {
            toast.error("Unexpected Error.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
        console.error(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (pending) {
        setPending(false);
      }
    }, 5000);
  }, [pending]);

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

            <button disabled={pending} type="submit">
              {pending ? (
                <div class="spinner-border text-white" role="status"></div>
              ) : (
                <>SignIn</>
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
