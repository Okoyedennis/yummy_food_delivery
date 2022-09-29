import React, { useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { Modal } from "react-bootstrap";

const ViewAccount = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  });

  useImperativeHandle(ref, () => ({
    showViewModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <Modal show={show}>
      <form noValidate>
        <div className="modal-header">
          <h5 className="modal-title text-dark">User Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              className="form-control"
              required
              value={user.firstName}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              className="form-control"
              required
              value={user.lastName}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              required
              value={user.username}
            />
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              className="form-control"
              required
              value={user.gender}
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
        </div>
      </form>
    </Modal>
  );
});

export default ViewAccount;
