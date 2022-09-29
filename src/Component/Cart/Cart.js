import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";
import CurrencyFormat from "react-currency-format";
import ClearCart from "./ClearCart";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { clearCurrentCount } from "../../redux/actions/user";
import Payment from "../Payment/Payment";

const Cart = () => {
  const [viewCart, setViewCart] = useState([]);
  const [checkQuantity, setCheckQuantity] = useState(false);
  const clearCartComponent = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/cart/view-cart`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setViewCart(resp);
        if (resp?.data?.quantity < 1) {
          setCheckQuantity(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const clearCartRequest = () => {
    clearCartComponent.current?.showClearCartModal();
  };

  const clearCart = () => {
    axios
      .delete(`${BASE_URL}/cart/clear-cart`, {
        headers: authHeader(),
      })
      .then(() => {
        window.location.reload();
        dispatch(clearCurrentCount());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProductFromCart = (item) => {
    axios
      .delete(`${BASE_URL}/cart/remove-cart-item/${item.id}`, {
        headers: authHeader(),
      })
      .then(() => {
        window.location.reload();
        dispatch(clearCurrentCount());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="cart container">
      <h2>Your Cart</h2>
      <div className="cart-header_bar">
        <Link to="/">
          <button className="btn btn-success">Continue Shopping</button>
        </Link>
        <div className="cart-header_middle">
          <button className="btn btn-danger" onClick={() => clearCartRequest()}>
            Clear Cart
          </button>
        </div>
        {checkQuantity ? (
          <div className="clickable">
            <Payment className="btn btn-primary " />
          </div>
        ) : (
          <>
            <Payment className="btn btn-primary" />
          </>
        )}
      </div>
      <div className="cart__content-container">
        <div className="cart-content__left">
          {checkQuantity ? (
            <h3>Your Cart is Empty</h3>
          ) : (
            <>
              {viewCart?.data?.cartItemList.map((item) => (
                <>
                  <div className="cart-content__cartItem-left">
                    <div className="img-text">
                      <img src={item.productImage} alt="" />
                      <div className="product_spect">
                        <h6>
                          <span>Name: </span>
                          {item.productName}
                        </h6>
                        <h6>
                          <span>Qty: </span>
                          {item.quantity}
                        </h6>
                        <CurrencyFormat
                          renderText={(value) => <strong>{value}</strong>}
                          decimalScale={2}
                          value={item.unitPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₦"}
                        />
                      </div>
                    </div>

                    <div className="product-spect-quantity btn btn-danger">
                      <FiTrash2
                        className="trashIcon"
                        onClick={() => deleteProductFromCart(item)}
                      />
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </>
          )}
        </div>
        <div className="cart-content__right">
          <h3>ORDER SUMMARY</h3>
          <div className="content__summary">
            <div className="content__summary-content">
              <p>Subtotal</p>
              <p>{viewCart.data?.quantity} item(s)</p>
            </div>
            <div className="content__summary-total">
              <h4>Total</h4>
              {checkQuantity ? (
                <CurrencyFormat
                  renderText={(value) => <h4>{value}</h4>}
                  decimalScale={2}
                  value={0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              ) : (
                <CurrencyFormat
                  renderText={(value) => <h4>{value}</h4>}
                  decimalScale={2}
                  value={viewCart.data?.cartTotal}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="checkout__textWarning">
        <h4>*Please use the following text credit card for payment*</h4>
        <h3>4242 4242 4242 4242 - Exp: 01/25 - CVW:123</h3>
      </div>
      <ClearCart ref={clearCartComponent} onConfirmed={() => clearCart()} />
    </div>
  );
};

export default Cart;
