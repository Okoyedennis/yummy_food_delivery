import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css";
import { Link } from "react-router-dom";
// import img1 from "../../img/featured3.jpg"

function Footer() {
  return (
    <div className="footer ">
      <div className="footer__info container">
        <h3>Pizza</h3>
        <div className="socialIcon">
          <Link className="link" to="">
            <FaFacebook className="fb" />
          </Link>
          <Link className="link" to="">
            <FaInstagram className="ig" />
          </Link>
          <Link className="link" to="">
            <FaYoutube className="yb" />
          </Link>
          <Link className="link" to="">
            <FaTwitter className="tw" />
          </Link>
          <Link className="link" to="">
            <FaLinkedin className="in" />
          </Link>
        </div>
      </div>
      <div className="footer__info-bottom container">
        <div className="cards">
          <h2 className="motto">
            OH YES, WE DID.THE YUMMY PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className="cards">
          <h1 className="title">FIND OUR RESTAURANTS</h1>
          <p className="text">
            1654 R. Don Road #304.
            <br /> Lagos, 85022
            <br /> (602) 867-1010
          </p>
          <p className="text">
            2356 K. Laquie Rd #235.
            <br /> Abuja, 85022
            <br /> (602) 867-1011
          </p>
          <p className="text">
            1614 E. Erwin St #104.
            <br /> Lagos, 85022
            <br /> (602) 867-1012
          </p>
          <p className="text">
            1614 W. Caroll St #125.
            <br /> Abuja, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        <div className="cards">
          <h1 className="title">WORKING HOURS</h1>
          <p className="text">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className="text">
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
