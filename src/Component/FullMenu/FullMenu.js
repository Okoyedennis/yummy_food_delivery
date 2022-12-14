import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../Models/Cart";
import { addCurrentCount } from "../../redux/actions/user";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import { ToastContainer, toast, Flip } from "react-toastify";


function FullMenu() {
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
     if (currentUser) {
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
     } else {
            toast.error("You need to signin.", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

     }
    };
  
  return (
    <div className="body containe">
      <h1>Full Menu</h1>
      <div className="underline"></div>
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Flip}
      />
      <div className="body__info">
        {product.map((product, index) => {
          return (
            <div className="body__flex" key={index}>
              <div>
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
                    prefix={"???"}
                  />
                </p>
                <button className="btns" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FullMenu;
