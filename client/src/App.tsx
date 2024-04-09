import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import VoteCard from "./components/VoteCard";
import MainPage from "./pages/MainPage";
import CreateVote from "./pages/CreateVote";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useAuthContext from "./contexts/AuthContext";

const App = () => {
  useAuthContext();

  // useEffect(() => {
  //   const get = async () => {
  //     await getUser();
  //   };

  //   get();
  // }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="h-screen w-screen bg-b2 font-bowlby text-white ">
        <Layout>
          {/* <MainPage /> */}
          <CreateVote />
        </Layout>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
