import React from 'react'
import { useState } from 'react'
import IndUserDetails from "../Component/AllUserDetails/IndUserDetails";
import Navbar from '../Component/Navbar/Navbar'

const UserDetails = () => {
  const [show] = useState(true)
  return (
    <div>
      <Navbar show={show} />
      <IndUserDetails />
    </div>
  );
}

export default UserDetails