import React, { useState } from 'react'
import Footer from '../Component/Footer/Footer';
import Pizzas from "../Component/Pizzas/Pizzas";
import Navbar from "../Component/Navbar/Navbar";

const PizzaPage = () => {
    const [show] = useState(true);

  return (
    <div>
      <Navbar show={show}/>
      <Pizzas />
      <Footer />
    </div>
  );
};

export default PizzaPage