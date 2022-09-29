import React, { useRef, useState } from "react";
import User from "../../Models/User";
import "./IndUserDetails.css";
import { useSelector } from "react-redux";
import EditAccount from "./EditAccount";
import ChangePassword from "./ChangePassword";
import ViewAccount from "./ViewAccount";
import { HiViewGrid } from "react-icons/hi";


const IndUserDetails = () => {
  const [selectedAccount, setSelectedAccount] = useState(
    new User("", "", "", "", "", "")
  );
  const [viewAccount, setViewAccount] = useState(
    new User("", "", "", "", "", "")
  );
  const [selectPassword, setSelectPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const currentUser = useSelector((state) => state.user);
  const editComponent = useRef();
  const changePasswordComponent = useRef();

  const editAccountRequest = () => {
    setSelectedAccount(
      new User(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.email,
        currentUser.username,
        currentUser.password,
        currentUser.gender
      )
    );
    editComponent.current?.showAccountModal();
  };

  const viewAccountRequest = () => {
    setViewAccount(
      new User(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.email,
        currentUser.username,
        currentUser.password,
        currentUser.gender
      )
    );
    editComponent.current?.showViewModal();
  };

  const updatePasswordRequest = () => {
    setSelectPassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    changePasswordComponent.current?.showAccountModal();
  };

  const data = [
    {
      title: "My Details",
      func: viewAccountRequest,
      icon: <HiViewGrid />,
    },
    {
      title: "Edit Details",
      func: editAccountRequest,
      icon: <HiViewGrid />,
    },
    {
      title: "Update Password",
      func: updatePasswordRequest,
      icon: <HiViewGrid />,
    },
  ];
  return (
    <>
      <div className="allUserDetails mt-5">
        <div className="allUserDetails__wrapper container">
          {data.map((item) => (
            <div className="admin_functionality">
              {item.icon}
              <div onClick={() => item.func()}>
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditAccount user={selectedAccount} ref={editComponent} />
      <ChangePassword password={selectPassword} ref={changePasswordComponent} />
      <ViewAccount user={viewAccount} ref={editComponent} />
    </>
  );
};

export default IndUserDetails;
