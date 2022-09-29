import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import Cart from "../../Models/Cart";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import "./Body.css";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentCount } from "../../redux/actions/user";


function Body() {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/auth/users/getAllProducts`)
      .then((resp) => {
        setProduct(resp.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
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
    <div className="body containe">
      <h1>Choose your favorite</h1>
      <div className="underline"></div>
      <div className="body__info">
        {product.slice(0, 3 ? 3 : product.length).map((product, index) => {
          return (
            <div className="body__flex" key={index}>
              {/* {product.productName.includes("Pizza") && ( */}
              <div>
                <Link to={`/singleProduct/${product.productId}`}>
                  <img src={product.productImage} alt={product.productName} />
                  <h3>{product.productName}</h3>
                  <p className="desc">{product.productDescription}</p>
                  <p className="price">
                    <CurrencyFormat
                      renderText={(value) => <b>{value}</b>}
                      decimalScale={2}
                      value={product.productPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  </p>
                </Link>

                <button className="btns" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
              {/* )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Body;
