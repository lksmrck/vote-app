import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="px-10">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
export default Layout;
