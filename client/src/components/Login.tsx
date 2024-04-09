import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button } from "@radix-ui/themes";

const Login = () => {
  const handleSuccessLogin = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse?.credential;
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:3000/auth/google/login", "_self");
  };

  return (
    <div>
      {/* <GoogleLogin
        onSuccess={handleSuccessLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */}
      <Button onClick={handleGoogleLogin}>Google</Button>
    </div>
  );
};

export default Login;
