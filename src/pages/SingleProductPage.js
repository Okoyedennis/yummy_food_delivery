import React, { useState } from "react";
import Navbar from "../Component/Navbar/Navbar";
import SingleProduct from "../Component/SingleProduct/SingleProduct";

const SingleProductPage = () => {
  const [show] = useState(true);

  return (
    <div>
      <Navbar show={show} />
      <SingleProduct />
    </div>
  );
};

export default SingleProductPage;
