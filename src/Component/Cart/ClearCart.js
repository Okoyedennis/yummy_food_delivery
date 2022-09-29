import React, { useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap';

const ClearCart = forwardRef((props, ref) => {
        const [show, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
          showClearCartModal() {
            setShow(true);
          },
        }));
    
      const clearCart = () => {
        props.onConfirmed();
        setShow(false);
      };
  return (
    <Modal show={show}>
      <div className="modal-header text-dark">
        <h5 className="modal-title">Confirmation</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShow(false)}
        ></button>
      </div>
      <div className="modal-body text-dark text-capitalize">Are you sure you want to clear your cart?</div>
      <div className="modal-footer text-dark">
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
          onClick={() => clearCart()}
        >
          I'm sure
        </button>
      </div>
    </Modal>
  );
})

export default ClearCart