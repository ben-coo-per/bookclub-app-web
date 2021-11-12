import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-avataaars-sprites";
import {
  Accessories,
  AccessoriesColor,
  ClotheGraphics,
  Clothes,
  ClothesColor,
  Eyebrow,
  Eyes,
  FacialHair,
  FacialHairColor,
  HairColor,
  HatColor,
  Mouth,
  Skin,
  Top,
} from "@dicebear/avatars-avataaars-sprites/dist/options";

export interface AvatarOptions {
  top: Top;
  hatColor?: HatColor;
  hairColor: HairColor;
  accessories?: Accessories;
  accessoriesColor?: AccessoriesColor;
  facialHair?: FacialHair;
  facialHairColor?: FacialHairColor;
  clothes: Clothes;
  clothesColor: ClothesColor;
  clotheGraphics?: ClotheGraphics;
  eyes?: Eyes;
  eyebrow?: Eyebrow;
  mouth?: Mouth;
  skin: Skin;
}

interface AvatarComponentOptions {
  size?: number;
  backgroundColor?: string;
  borderRadius?: number;
  avatarOptions?: AvatarOptions;
}

export const Avatar = ({
  size = 40,
  backgroundColor,
  borderRadius = 10,
  avatarOptions,
}: AvatarComponentOptions) => {
  let svg = createAvatar(style, {
    size: size,
    backgroundColor: backgroundColor,
    radius: borderRadius,
    ...avatarOptions,
  });

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};
