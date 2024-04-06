import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleSuccessLogin = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    const token = credentialResponse?.credential;
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccessLogin}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
