import React from "react";
import { Link } from "react-router-dom";
import "./Herosection.css";

function Herosection() {
  return (
    <div className="Herosection">
      <div className="Herosection__info containe">
        <h1>
          GREATEST <br /> PIZZA EVER!!!
        </h1>
        <h4>READY IN 60 SECONDS.</h4>
        <Link to="/fullmenu">
          <button className="btns">View</button>
        </Link>
      </div>
    </div>
  );
}

export default Herosection;
