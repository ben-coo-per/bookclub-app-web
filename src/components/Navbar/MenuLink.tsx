import React from "react";
import { Link, useLocation } from "react-router-dom";

export const MenuLink = ({
  name,
  icon,
  linkTo,
}: {
  name: string;
  icon?: React.ReactElement;
  linkTo: string;
}) => {
  const location = useLocation();

  const isCurrentPage = location.pathname === linkTo;
  return (
    <Link to={linkTo}>
      <div className="rounded-lg md:p-1 hover:bg-accent">
        <div
          className={`flex flex-row gap-2 pb-1 items-end ${
            isCurrentPage && "border-midnightBlue border-b-2"
          } cursor-pointer`}
        >
          {icon}
          <p className="hidden md:block font-sans font-bold font-size text-l text-darkBlue align-middle">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
};
