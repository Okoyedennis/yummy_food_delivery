import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Product from "../../../Models/Product";
import BASE_URL from "../../../services/Constant";
import { Modal } from "react-bootstrap";
import { authHeader } from "../../../services/BaseService";


const ProductSave = forwardRef((props, ref) => {
  const [product, setProduct] = useState(
    new Product("", "", "", "", "", "", 0, "")
  );
  const [submitted, setSubmitted] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);

  useImperativeHandle(ref, () => ({
    showProductModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const saveProduct = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !product.productName ||
      !product.categoryName ||
      !product.productPrice ||
      !product.size ||
      !product.productDescription
    ) {
      return;
    }


    if (props.product.productId) {
      axios
          .put(
            `${BASE_URL}/api/admin/update-product/${props.product.productId}`,
            product,
            {
              headers: authHeader(),
            }
          )
          .then((resp) => {
            setShow(false);
            setSubmitted(false);
            console.log(resp);
            props.reload();
          })
          .catch((error) => {
            setErrorMessage("Unexpected error occurred.");
            console.error(error);
          });
    } else {
      axios
        .post(`${BASE_URL}/api/admin/create-product`, product, {
          headers: authHeader(),
        })
        .then(() => {
          setShow(false);
          setSubmitted(false);
            props.reload();

        })
        .catch((error) => {
          setErrorMessage("Unexpected error occurred.");
          console.error(error);
        });
    }
  };

  return (
    <Modal show={show}>
      <div className="bg-warning">
        <form
          onSubmit={(e) => saveProduct(e)}
          noValidate
          className={submitted ? "was-validated" : ""}
        >
          <div className="modal-header text-dark">
            <h5 className="modal-title">Product Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShow(false)}
            >
              {" "}
            </button>
          </div>
          <div className="modal-body">
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group mb-3">
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                className="form-control"
                required
                value={product.productName}
                onChange={(e) => handleChange(e)}
              />
              <div className="invalid-feedback">Product name is required.</div>
            </div>

            <div className="form-group mb-3">
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-lg example"
                required
                value={product.categoryName}
                name="categoryName"
                onChange={(e) => handleChange(e)}
              >
                <option>Category</option>
                <option value="Pizza">Pizza</option>
                <option value="Desserts">Desserts</option>
                <option value="Burger">Burger</option>
                <option value="Sides">Sides</option>
                <option value="Drinks">Drinks</option>
              </select>
              <div className="invalid-feedback">
                Product category is required.
              </div>
            </div>

            <div className="form-group mb-3">
              <input
                type="number"
                name="productPrice"
                placeholder="Product Price"
                className="form-control"
                required
                value={product.productPrice}
                onChange={(e) => handleChange(e)}
              />
              <div className="invalid-feedback">Product price is required.</div>
            </div>

            <div className="form-group mb-3">
              <select
                class="form-select form-select-md mb-3"
                aria-label=".form-select-lg example"
                required
                value={product.size}
                name="size"
                onChange={(e) => handleChange(e)}
              >
                <option selected>Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <div className="invalid-feedback">Product size is required.</div>
            </div>

            <div className="form-group mb-3">
              <textarea
                name="productDescription"
                placeholder="Product Description"
                className="form-control"
                required
                rows="4"
                min="5"
                max="255"
                value={product.productDescription}
                onChange={(e) => handleChange(e)}
              />
              <div className="invalid-feedback">
                Product description is required.
              </div>
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
      </div>
    </Modal>
  );
});

export default ProductSave;
