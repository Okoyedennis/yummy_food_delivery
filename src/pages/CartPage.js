import React from "react";
import { useState } from "react";
import Cart from "../Component/Cart/Cart";
import Navbar from "../Component/Navbar/Navbar";

const CartPage = () => {
    const [show] = useState(false)
  return (
    <div>
          <Navbar show={show} />
      <Cart />
    </div>
  );
};

export default CartPage;
