import React from "react";
import Login from "./Login";
import useAuthContext from "../contexts/AuthContext";
import { Avatar, Box, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const { currentUser } = useAuthContext();
  console.log(currentUser);
  const firstNameLetter = currentUser?.displayName[0];
  return (
    <div className="  py-5 ">
      <div className="border-b border-blue-100 flex justify-between">
        <h1 className=" text-xl">Vote</h1>
        <div>
          <div className="font-chelsea">
            {currentUser ? (
              <Flex gap="3">
                <Avatar
                  src={currentUser.photoUrl}
                  fallback={firstNameLetter!}
                />
                <p>{currentUser.displayName}</p>
              </Flex>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
