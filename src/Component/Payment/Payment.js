import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import { clearCurrentCount } from '../../redux/actions/user';
import { authHeader } from '../../services/BaseService';
import BASE_URL from '../../services/Constant';

const Payment = () => {
        const [cartTotal, setCartTotal] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
      useEffect(() => {
        axios
          .get(`${BASE_URL}/cart/view-cart`, {
            headers: authHeader(),
          })
          .then((resp) => {
            setCartTotal(resp.data);
        
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    
     const publishablekey =
         "pk_test_51IbB5iJrhAChGpxwxROklguJqVX3OZiG6e2tnHjegK4jwuAFGWmUtGYtLWvDF0EGE4qsI5wfeNguLtPA4XNGJ24I00mo8wN45I";
    
     const onToken = () => {
       axios
         .delete(`${BASE_URL}/cart/clear-cart`, {
           headers: authHeader(),
         })
         .then(() => {
             dispatch(clearCurrentCount());
             navigate("/")
         })
         .catch((error) => {
           console.log(error);
         });
     };
  return (
      <StripeCheckout
        label="Proceed To Checkout"
        name="Yummy"
        description={`Your total is
         ₦${cartTotal.cartTotal}`}
        panelLabel="Pay Now "
        token={onToken}
        stripeKey={publishablekey}
      />
  );
}

export default Payment