import React, { useState } from 'react'
import Footer from '../Component/Footer/Footer';
import FullMenu from "../Component/FullMenu/FullMenu";
import Navbar from '../Component/Navbar/Navbar';

const FullMenuPage = () => {
    const [show] = useState(true);

  return (
    <div>
      <Navbar show={show}/>
      <FullMenu />
      <Footer />
    </div>
  );
};

export default FullMenuPage;