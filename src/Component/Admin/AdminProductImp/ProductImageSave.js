import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { authHeader } from "../../../services/BaseService";
import BASE_URL from "../../../services/Constant";

const ProductImageSave = forwardRef((props, ref) => {
  const [productId, setProductId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState(false);
    const [imageFormData, setImageFormData] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [pending, setPending] = useState(false);

  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    showProductModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  const handleUploadImage = (e) => {
      e.preventDefault();
      setSubmitted(true);
      setPending(true)
      
    const UPLOAD_IMAGE_API = `${BASE_URL}/api/admin/upload-image`;

    const formData = new FormData();
    formData.append("image", imageFormData, imageFormData.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        headers: authHeader(),
      },
    };

      const url = `${UPLOAD_IMAGE_API}/${productId}`;
    axios
      .post(url, formData, config)
      .then(() => {
        setInfoMessage(true);
          setSubmitted(false);  
          setPending(false)
        setProductId("");
      })
      .catch((error) => {
        setErrorMessage("Unexpected error occurred.");
        console.error(error);
      });
  };
    
     useEffect(() => {
       setTimeout(() => {
         if (infoMessage) {
           setInfoMessage(false);
           setShow(false);
           window.location.reload();
         }
       }, 2000);
     }, [infoMessage]);
  return (
    <Modal show={show}>
      <div className="bg-warning">
        <form
          onSubmit={(e) => handleUploadImage(e)}
          noValidate
          className={submitted ? "was-validated" : ""}
        >
          <div className="modal-header text-dark">
            <h5 className="modal-title">Product Image</h5>
            <button
              className="btn-close"
              type="button"
              onClick={() => setShow(false)}
            ></button>
          </div>
          <div className="modal-body text-dark">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            {infoMessage && (
              <div
                className="alert alert-success alert-dismissible fade show d-flex justify-content-between text-dark"
                role="alert"
              >
                Product image added successfully
              </div>
            )}

            <div className="form-group">
              <input
                type="text"
                name="productId"
                className="form-control mb-3"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <div className="invalid-feedback">ProductId is required.</div>
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="image"
                onChange={(e) => setImageFormData(e.target.files[0])}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                onClick={handleUploadImage}
                type="submit"
                className="btn btn-primary"
              >
                {pending ? (
                  <div class="spinner-border text-white" role="status">
                  </div>
                ) : (
                  <span class="sr-only">Upload Image</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
});

export default ProductImageSave;
