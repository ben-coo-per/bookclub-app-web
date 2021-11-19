import { Skeleton, SkeletonText } from "../Skeleton";
import Avatar from "boring-avatars";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Button } from "../Inputs";
import { TextDataDisplay } from "../textDataDisplay";
import { useNavigate } from "react-router";

export const ProfileUserBox = () => {
  const [{ data, fetching }] = useMeQuery();
  const navigate = useNavigate();
  const [, logout] = useLogoutMutation();

  async function handleLogout() {
    const response = await logout();

    if (!response.data?.logout) {
      //Error
      console.log("Error: Something went wrong");
    } else {
      // Successfully returned member
      navigate("/");
    }
  }

  let avatarBody;

  return (
    <div className="col-span-4 md:col-span-2 md:col-start-2 bg-white mx-auto p-5 rounded-xl shadow-lg gap-3 w-full">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-darkBlue text-4xl font-bold">Your Profile</h2>
        </div>
        <div className="grid grid-cols-6 gap-y-1">
          <div className="flex col-span-6 md:col-span-2 align-middle justify-center">
            <Skeleton
              isLoaded={data?.me != null}
              className="h-40 w-40"
              variant="circle"
            >
              <Avatar
                size={160}
                name={data?.me?.name}
                variant="bauhaus"
                colors={["#1A2557", "#2415CD", "#F2E3CB", "#AE3028", "#DFC640"]}
              />
            </Skeleton>
          </div>
          <div className="flex flex-col justify-between items-center col-span-6 px-4 md:col-span-4 md:px-8 md:items-end">
            <TextDataDisplay
              label="Name"
              truncate={false}
              className="md:w-full"
            >
              <SkeletonText
                isLoaded={data?.me?.name != null}
                isError={!fetching && !data?.me}
                fontStyles="text-2xl text-darkBlue text-serif"
                errorFontStyles="text-sm text-midnightBlue text-serif"
                className="h-6 mt-1"
              >
                {data?.me?.name}
              </SkeletonText>
            </TextDataDisplay>
            <Button variant="link" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
