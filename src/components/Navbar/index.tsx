import { Link } from "react-router-dom";
import { Menu } from "./Menu";

export const NavBar = () => {
  return (
    <div className="bg-background py-4 px-4 md:px-10 border-b-2 border-champagne sticky top-0 ">
      <div className="flex flex-row w-full justify-between items-center">
        <Link to="/">
          <img src="/Logo.svg" alt="logo" />
        </Link>
        <Menu />
      </div>
    </div>
  );
};
