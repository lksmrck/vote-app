import { getLocalStorage, getSessionStorage } from "../utils/getStorage";

// import { router } from "../routes";
import agent from "../api/agent";
import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
  useContext,
} from "react";
import { UserInLS } from "../models/user";
// import { useNavigate } from "react-router";

interface AuthContextInterface {
  currentUser: UserInLS | null;
  setCurrentUser: Dispatch<SetStateAction<UserInLS | null>>;
  getUser: () => Promise<void>;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    getLocalStorage("user") || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  const logoutUser = () => {
    setCurrentUser(null);
    // navigate("/");
  };

  const getUser = async () => {
    const user = await agent.Auth.getUser();
    setCurrentUser({
      displayName: user?.displayName,
      photoUrl: user.photos[0]?.value,
      id: user.id,
      email: user.emails[0]?.value,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // init
  useEffect(() => {
    if (currentUser == null) {
      console.log("User refetch");
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        getUser,
        logoutUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
