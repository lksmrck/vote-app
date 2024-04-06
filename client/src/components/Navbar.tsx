import React from "react";
import Login from "./Login";

const Navbar = () => {
  return (
    <div className="  py-5 ">
      <div className="border-b border-blue-100 flex justify-between">
        <h1 className=" text-xl">Vote</h1>
        <div>
          <div className="font-chelsea">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
