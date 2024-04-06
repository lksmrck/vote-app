import { getLocalStorage, getSessionStorage } from "../utils/getStorage";
// import { UserInLS } from "../models/UserInLS";
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
import { useNavigate } from "react-router";

interface AuthContextInterface {
  //   currentUser: UserInLS | null;
  currentUser: any;
  //   setCurrentUser: Dispatch<SetStateAction<UserInLS | null>>;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
  //   loginUser: (user: any) => void;
  logoutUser: () => void;
  isLoading: boolean;
}

const AuthContext = createContext({} as AuthContextInterface);

export const AuthContextProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  //Stored data for user and company
  const [currentUser, setCurrentUser] = useState(
    // getSessionStorage("user") || null
    getLocalStorage("user") || null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    // sessionStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        // loginUser,
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
