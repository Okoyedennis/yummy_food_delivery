import axios from "axios";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { Modal } from "react-bootstrap";
import User from "../../Models/User";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";

const EditAccount = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [successfulMessage, setSuccessfulMessage] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(new User("", "", "", "", "", ""));

  useImperativeHandle(ref, () => ({
    showAccountModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const editUser = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!user.firstName || !user.lastName || !user.email || !user.gender) {
      return;
    }

    axios
      .put(`${BASE_URL}/api/v1/auth/users/edit`, user, {
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
        setMessage("Unexpected Error");
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (message || successfulMessage) {
        setSuccessfulMessage("");
        setMessage("");
      }
    }, 5000);
  }, [message, successfulMessage]);

  return (
    <Modal show={show}>
      <form
        onSubmit={(e) => editUser(e)}
        noValidate
        className={submitted ? "was-validated" : ""}
      >
        <div className="modal-header">
          <h5 className="modal-title text-dark">User Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          >
          </button>
        </div>
        <div className="modal-body">
          {message && <div className="alert alert-danger">{message}</div>}
          {successfulMessage && (
            <div className="alert alert-success">{successfulMessage}</div>
          )}
          <div className="form-group mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              className="form-control"
              required
              value={user.firstName}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Firstname is required.</div>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              className="form-control"
              required
              value={user.lastName}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Lastname is required.</div>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              required
              value={user.username}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Username is required.</div>
          </div>

          <div className="form-group mb-3">
            <select
              className="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              required
              value={user.gender}
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option selected disabled>
                Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            <div className="invalid-feedback">Gender is required.</div>
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
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
});

export default EditAccount;
