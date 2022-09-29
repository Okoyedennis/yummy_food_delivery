import React, { useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { Modal } from "react-bootstrap";

const ProductDelete = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);


  useImperativeHandle(ref, () => ({
    showDeleteModal() {
      setShow(true);
    },
  }));

  const deleteProduct = () => {
    props.onConfirmed();
    setShow(false);
  };
  return (
    <Modal show={show}>
      <div className="bg-warning">
        <div className="modal-header text-dark">
          <h5 className="modal-title">Confirmation</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="modal-body text-dark">
          Are you sure to delete the selected product?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteProduct()}
          >
            I'm sure
          </button>
        </div>
      </div>
    </Modal>
  );
});

export default ProductDelete;
