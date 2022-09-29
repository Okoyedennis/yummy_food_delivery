import React, { useState } from 'react'
import Body from '../Component/Body/Body';
import Footer from '../Component/Footer/Footer';
import Herosection from '../Component/HeroSection/Herosection';
import Icecream from '../Component/IceCream/Icecream';
import Meal from '../Component/Meal/Meal';
import Navbar from '../Component/Navbar/Navbar';

const HomePage = () => {
    const [show] = useState(true);

  return (
    <div>
      <Navbar show={show}/>
      <Herosection />
      <Body />
      <Meal />
      <Icecream />
      <Footer />
    </div>
  );
};

export default HomePage