import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="pt-16">{children}</div>
    </div>
  );
}

export default Layout;