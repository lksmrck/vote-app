import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import CreateVote from "./pages/CreateVote";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useAuthContext from "./contexts/AuthContext";
import { Routes, Route, useNavigate } from "react-router";
import NotFound from "./pages/errors/NotFound";
import VoteDetail from "./pages/VoteDetail";

const App = () => {
  // fetchne user data, pokud je authenticated
  useAuthContext();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="h-screen w-screen bg-b2 font-bowlby text-white ">
        <Layout>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/create" element={<CreateVote />} />
            <Route path="/vote/:id" element={<VoteDetail />} />
          </Routes>

          {/* <CreateVote /> */}
        </Layout>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
