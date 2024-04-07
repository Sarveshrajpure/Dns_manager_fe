import React from "react";
import logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import { signOutUser } from "../Actions/AuthActions";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      let response = await signOutUser();
      console.log(response);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white/60 border-gray-200 backdrop-blur-md shadow-sm">
      <div className="flex  items-center justify-between p-1 md:pt-2 md:pb-3 mx-2 md:mx-5">
        <div className="">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} width={30} height={30} className="object-contain pt-1" alt="CgLogo" />
            <div className="text-2xl font-semibold">Dns Manager</div>
          </a>
        </div>
        <div className="text-lg cursor-pointer font-medium" onClick={logout}>
          Sign out
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
