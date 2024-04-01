import { useState } from "react";
import Layout from "./components/Layout";
import VoteCard from "./components/VoteCard";
import MainPage from "./pages/MainPage";
import CreateVote from "./pages/CreateVote";

const App = () => {
  return (
    <div className="h-screen w-screen bg-b2 font-bowlby text-white ">
      <Layout>
        {/* <MainPage /> */}
        <CreateVote />
      </Layout>
    </div>
  );
};

export default App;
