import Avatar, { genConfig } from "react-nice-avatar";

export interface AvatarOptions {
  // top: Top;
  // hatColor?: HatColor;
  // hairColor: HairColor;
  // accessories?: Accessories;
  // accessoriesColor?: AccessoriesColor;
  // facialHair?: FacialHair;
  // facialHairColor?: FacialHairColor;
  // clothes: Clothes;
  // clothesColor: ClothesColor;
  // clotheGraphics?: ClotheGraphics;
  // eyes?: Eyes;
  // eyebrow?: Eyebrow;
  // mouth?: Mouth;
  // skin: Skin;
}

interface AvatarComponentOptions {
  size?: number;
  backgroundColor?: string;
  borderRadius?: number;
  avatarOptions?: AvatarOptions;
}

export const UserAvatar = ({
  size = 40,
  backgroundColor,
  borderRadius = 10,
  avatarOptions,
}: AvatarComponentOptions) => {
  const config = genConfig();
  return <Avatar className={`w-${size} h-${size}`} {...config} />;
};
