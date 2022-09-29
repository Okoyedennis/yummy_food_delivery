import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import "./SingleProduct.css";
import CurrencyFormat from "react-currency-format";
import { Role } from "../../Models/Role";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../Models/Cart";
import { authHeader } from "../../services/BaseService";
import { addCurrentCount } from "../../redux/actions/user";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [infoMessage, setInfoMessage] = useState(false);
  const dispatch = useDispatch();

    const { productId } = useParams();
     const currentUser = useSelector((state) => state.user);
    

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/auth/users/fetch-single-product/${productId}`)
      .then((response) => {
        setSingleProduct(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(singleProduct);
    // eslint-disable-next-line
  }, []);

  const addToCart = (product) => {
    const cart = new Cart(
      currentUser.userId,
      product.productId,
      product.productName,
      product.productImage,
      product.size,
      product.quantity,
      product.unitPrice,
      product.subTotal,
      product.cartId
    );

    axios
      .post(`${BASE_URL}/cart/add-to-cart/${product.productId}`, cart, {
        headers: authHeader(),
      })
      .then(() => {
        dispatch(addCurrentCount());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="parentContainer">
      <div className="contentSection container">
        <div className="sproductPicture">
          <img src={singleProduct.productImage} alt="" />
        </div>
        <div className="productDetails">
          <h3 className="productArticleHeading">{singleProduct.productName}</h3>
          <p className="priceText">
            <CurrencyFormat
              renderText={(value) => <h4>{value}</h4>}
              decimalScale={2}
              value={singleProduct.productPrice}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </p>
          <hr className="productDetailsLine" />
          <article className="productFullDetails">
            {singleProduct.productDescription}
          </article>
          <div>
            {currentUser?.roles[0].name === Role.ROLE_PREMIUM && (
              <button onClick={() => addToCart(singleProduct)}>Add To Cart</button>
            )}
          </div>
          <hr className="productDetailsLine" />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
