import React, { useState } from 'react'
import Footer from '../Component/Footer/Footer';
import Desserts from "../Component/Desserts/Desserts";
import Navbar from '../Component/Navbar/Navbar';

const DessertPage = () => {
    const [show] = useState(true);

  return (
    <div>
      <Navbar show={show}/>
      <Desserts />
      <Footer />
    </div>
  );
};

export default DessertPage;