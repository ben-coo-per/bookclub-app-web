import { Skeleton, SkeletonText } from "../Skeleton";
import { Avatar } from "./Avatar";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Button } from "../Inputs";
import { TextDataDisplay } from "../textDataDisplay";
import { useNavigate } from "react-router";
import {
  Accessories,
  AccessoriesColor,
  ClotheGraphics,
  Eyebrow,
  Eyes,
  FacialHair,
  FacialHairColor,
  HatColor,
  Mouth,
} from "@dicebear/avatars-avataaars-sprites/dist/options";

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

  return (
    <div className="col-span-4 md:col-span-2 md:col-start-2 bg-white mx-auto p-5 rounded-xl shadow-lg gap-3 w-full">
      <div className="flex flex-col">
        <div>
          <h2 className="text-darkBlue text-4xl font-bold">Your Profile</h2>
        </div>
        <div className="flex flex-row gap-6">
          <Skeleton
            isLoaded={data?.me?.avatar.options != null}
            height={44}
            width={44}
          >
            <Avatar
              backgroundColor="#1A2557"
              size={180}
              avatarOptions={{
                top: data?.me?.avatar.options?.top
                  ? data?.me?.avatar.options?.top
                  : ["sides"],

                hairColor: data?.me?.avatar.options?.hairColor
                  ? data?.me?.avatar.options?.hairColor
                  : ["blonde"],

                clothes: data?.me?.avatar.options?.clothes
                  ? data?.me?.avatar.options?.clothes
                  : ["shirtCrewNeck"],

                clothesColor: data?.me?.avatar.options?.clothesColor
                  ? data?.me?.avatar.options?.clothesColor
                  : ["blue03"],

                skin: data?.me?.avatar.options?.skin
                  ? data?.me?.avatar.options?.skin
                  : ["light"],

                hatColor: data?.me?.avatar.options?.hatColor as
                  | HatColor
                  | undefined,
                accessories: data?.me?.avatar.options?.accessories as
                  | Accessories
                  | undefined,

                accessoriesColor: data?.me?.avatar.options?.accessoriesColor as
                  | AccessoriesColor
                  | undefined,

                facialHair: data?.me?.avatar.options?.facialHair as
                  | FacialHair
                  | undefined,

                facialHairColor: data?.me?.avatar.options?.facialHairColor as
                  | FacialHairColor
                  | undefined,

                clotheGraphics: data?.me?.avatar.options?.clotheGraphics as
                  | ClotheGraphics
                  | undefined,

                eyes: data?.me?.avatar.options?.eyes
                  ? data?.me?.avatar.options?.eyes
                  : (["default"] as Eyes | undefined),

                eyebrow: data?.me?.avatar.options?.eyebrow
                  ? data?.me?.avatar.options?.eyebrow
                  : (["default"] as Eyebrow | undefined),

                mouth: data?.me?.avatar.options?.mouth
                  ? data?.me?.avatar.options?.mouth
                  : (["default"] as Mouth | undefined),
              }}
            />
          </Skeleton>

          <div className="flex flex-col justify-between">
            <TextDataDisplay label="Name">
              <SkeletonText
                isLoaded={data?.me?.name != null}
                isError={!fetching && !data?.me}
                fontStyles="text-lg md:text-2xl text-darkBlue text-serif"
                errorFontStyles="text-sm text-midnightBlue text-serif"
              >
                {data?.me?.name}
              </SkeletonText>
            </TextDataDisplay>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
