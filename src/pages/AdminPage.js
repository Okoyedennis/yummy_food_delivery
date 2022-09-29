import React from "react";
import { Link } from "react-router-dom";
import { HiViewGrid } from "react-icons/hi";
import Navbar from "../Component/Navbar/Navbar";

const AdminPage = () => {
  const data = [
    {
      title: "View All Product",
      link: "/allProduct",
      icon: <HiViewGrid />,
    },
  ];
  return (
    <div>
      <Navbar />
      <div className="allUserDetails mt-5">
        <div className="allUserDetails__wrapper container">
          {data.map((item) => (
            <>
              <Link to={item.link}>
                {item.icon}
                <h5>{item.title}</h5>
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
