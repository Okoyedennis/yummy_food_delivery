import React, { useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";

const ChangePassword = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [userPassword, setUserPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
    
      const togglePasswordView = () => {
        setTogglePassword(!togglePassword);
      };

      const toggleNewPasswordView = () => {
        setToggleNewPassword(!toggleNewPassword);
      };

      const toggleConfirmPasswordView = () => {
        setToggleConfirmPassword(!toggleConfirmPassword);
      };

      useImperativeHandle(ref, () => ({
        showAccountModal() {
          setTimeout(() => {
            setShow(true);
          }, 0);
        },
      }));
    
     
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserPassword((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };

    useEffect(() => {
      setUserPassword(props.password);
    }, [props.password]);
  
      const changePasswordRequest = (e) => {
        e.preventDefault();
        setPending(true);
        if (
          !userPassword.oldPassword ||
          !userPassword.newPassword ||
          !userPassword.confirmPassword
        ) {
          setMessage("Please Fill Out All Input");

          return;
        }

        if (userPassword.newPassword !== userPassword.confirmPassword) {
          setMessage("Please Reconfirm Your Password");
          return;
        }
        axios
          .put(`${BASE_URL}/api/v1/auth/users/password-update`, userPassword, {
            headers: authHeader(),
          })
          .then((resp) => {
            setTimeout(() => {
              if (resp.status === 200) {
                setSuccessfulMessage("Password Successfully");
              }
            }, 2000);
            setTimeout(() => {
              if (resp.status === 200) {
                setShow(false);
              }
            }, 3000);
              console.log(resp);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 500) {
              setMessage("Old Password Is Invalid");
            }
          });
      };
    
      useEffect(() => {
        setTimeout(() => {
          if (message || pending || successfulMessage) {
            setPending(false);
            setMessage("");
            setSuccessfulMessage("");
          }
        }, 5000);
      }, [message, successfulMessage, pending]);

  return (
    <Modal show={show}>
          <form
              onSubmit={(e) => changePasswordRequest(e)}
              noValidate>
        <div className="modal-header">
          <h5 className="modal-title text-dark">Change Password</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          >
            {" "}
          </button>
        </div>

        <div className="modal-body">
          {message && <div className="alert alert-danger">{message}</div>}
          {successfulMessage && (
            <div className="alert alert-success">{successfulMessage}</div>
          )}
          <div className="form-group mb-3 input-group flex-nowrap">
            <span
              class="input-group-text"
              id="addon-wrapping"
              onClick={togglePasswordView}
            >
              {togglePassword ? (
                <BsFillEyeFill style={{ color: "#111", cursor: "pointer" }} />
              ) : (
                <BsFillEyeSlashFill
                  style={{ color: "#111", cursor: "pointer" }}
                />
              )}
            </span>
            <input
              type={togglePassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              className="form-control"
              required
              value={userPassword.oldPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group mb-3 input-group flex-nowrap">
            <span
              class="input-group-text"
              id="addon-wrapping"
              onClick={toggleNewPasswordView}
            >
              {toggleNewPassword ? (
                <BsFillEyeFill style={{ color: "#111", cursor: "pointer" }} />
              ) : (
                <BsFillEyeSlashFill
                  style={{ color: "#111", cursor: "pointer" }}
                />
              )}
            </span>
            <input
              type={toggleNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className="form-control"
              required
              value={userPassword.newPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group mb-3 input-group flex-nowrap">
            <span
              class="input-group-text"
              id="addon-wrapping"
              onClick={toggleConfirmPasswordView}
            >
              {toggleConfirmPassword ? (
                <BsFillEyeFill style={{ color: "#111", cursor: "pointer" }} />
              ) : (
                <BsFillEyeSlashFill
                  style={{ color: "#111", cursor: "pointer" }}
                />
              )}
            </span>
            <input
              type={toggleConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control"
              required
              value={userPassword.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? (
              <div class="spinner-border text-white" role="status"></div>
            ) : (
              <>Update</>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
});
export default ChangePassword;
