import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { MenuLink } from "./MenuLink";
import { useMeQuery } from "../../generated/graphql";

export const Menu = () => {
  const [{ data, fetching }] = useMeQuery();

  let authSpot = null;
  if (fetching) {
    // Data is loading
  } else if (!data?.me) {
    // User in not logged in
    authSpot = (
      <MenuLink
        linkTo="/auth/login"
        name="Login"
        icon={<UserCircleIcon className="h-6 w-6 text-darkBlue" />}
      />
    );
  } else {
    // User is logged in
    authSpot = (
      <MenuLink
        linkTo="/profile"
        name={data.me.name}
        icon={<UserCircleIcon className="h-6 w-6 text-darkBlue" />}
      />
    );
  }

  return (
    <div className="flex flex-row gap-6 content-center">
      <MenuLink
        name="Home"
        linkTo="/"
        icon={<HomeIcon className="h-6 w-6 text-darkBlue" />}
      />
      <MenuLink
        linkTo="/readings"
        name="Reading"
        icon={<BookOpenIcon className="h-6 w-6 text-darkBlue" />}
      />
      <MenuLink
        linkTo="/meetings"
        name="Meetings"
        icon={<CalendarIcon className="h-6 w-6 text-darkBlue" />}
      />
      {authSpot}
    </div>
  );
};
