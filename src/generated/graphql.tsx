import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Accessories {
  Kurt = 'kurt',
  Prescription01 = 'prescription01',
  Prescription02 = 'prescription02',
  Round = 'round',
  Sunglasses = 'sunglasses',
  Wayfarers = 'wayfarers'
}

export enum AccessoriesColor {
  Black = 'black',
  Blue = 'blue',
  Blue01 = 'blue01',
  Blue02 = 'blue02',
  Blue03 = 'blue03',
  Gray = 'gray',
  Gray01 = 'gray01',
  Gray02 = 'gray02',
  Heather = 'heather',
  Pastel = 'pastel',
  PastelBlue = 'pastelBlue',
  PastelGreen = 'pastelGreen',
  PastelOrange = 'pastelOrange',
  PastelRed = 'pastelRed',
  PastelYellow = 'pastelYellow',
  Pink = 'pink',
  Red = 'red',
  White = 'white'
}

/** Avatar options type */
export type AvatarOptionsType = {
  __typename?: 'AvatarOptionsType';
  accessories?: Maybe<Array<Accessories>>;
  accessoriesColor?: Maybe<Array<AccessoriesColor>>;
  clotheGraphics?: Maybe<Array<ClotheGraphics>>;
  clothes: Array<Clothes>;
  clothesColor: Array<ClothesColor>;
  eyebrow?: Maybe<Array<Eyebrow>>;
  eyes?: Maybe<Array<Eyes>>;
  facialHair?: Maybe<Array<FacialHair>>;
  facialHairColor?: Maybe<Array<FacialHairColor>>;
  hairColor: Array<HairColor>;
  hatColor?: Maybe<Array<HatColor>>;
  mouth?: Maybe<Array<Mouth>>;
  skin: Array<Skin>;
  top: Array<Top>;
};

/** Avatar model that includes both seed and options for customization */
export type AvatarType = {
  __typename?: 'AvatarType';
  isSet: Scalars['Boolean'];
  options?: Maybe<AvatarOptionsType>;
};

export enum ClotheGraphics {
  Bat = 'bat',
  Bear = 'bear',
  Cumbia = 'cumbia',
  Deer = 'deer',
  Diamond = 'diamond',
  Hola = 'hola',
  Pizza = 'pizza',
  Resist = 'resist',
  Skull = 'skull',
  SkullOutline = 'skullOutline'
}

export enum Clothes {
  Blazer = 'blazer',
  BlazerAndShirt = 'blazerAndShirt',
  BlazerAndSweater = 'blazerAndSweater',
  CollarAndSweater = 'collarAndSweater',
  GraphicShirt = 'graphicShirt',
  Hoodie = 'hoodie',
  Overall = 'overall',
  Shirt = 'shirt',
  ShirtCrewNeck = 'shirtCrewNeck',
  ShirtScoopNeck = 'shirtScoopNeck',
  ShirtVNeck = 'shirtVNeck',
  Sweater = 'sweater'
}

export enum ClothesColor {
  Black = 'black',
  Blue = 'blue',
  Blue01 = 'blue01',
  Blue02 = 'blue02',
  Blue03 = 'blue03',
  Gray = 'gray',
  Gray01 = 'gray01',
  Gray02 = 'gray02',
  Heather = 'heather',
  Pastel = 'pastel',
  PastelBlue = 'pastelBlue',
  PastelGreen = 'pastelGreen',
  PastelOrange = 'pastelOrange',
  PastelRed = 'pastelRed',
  PastelYellow = 'pastelYellow',
  Pink = 'pink',
  Red = 'red',
  White = 'white'
}

export enum Eyebrow {
  Angry = 'angry',
  AngryNatural = 'angryNatural',
  Default = 'default',
  DefaultNatural = 'defaultNatural',
  Flat = 'flat',
  FlatNatural = 'flatNatural',
  Frown = 'frown',
  FrownNatural = 'frownNatural',
  Raised = 'raised',
  RaisedExcited = 'raisedExcited',
  RaisedExcitedNatural = 'raisedExcitedNatural',
  Sad = 'sad',
  SadConcerned = 'sadConcerned',
  SadConcernedNatural = 'sadConcernedNatural',
  Unibrow = 'unibrow',
  UnibrowNatural = 'unibrowNatural',
  Up = 'up',
  UpDown = 'upDown',
  UpDownNatural = 'upDownNatural'
}

export enum Eyes {
  Close = 'close',
  Closed = 'closed',
  Cry = 'cry',
  Default = 'default',
  Dizzy = 'dizzy',
  EyeRoll = 'eyeRoll',
  Happy = 'happy',
  Hearts = 'hearts',
  Roll = 'roll',
  Side = 'side',
  Squint = 'squint',
  Surprised = 'surprised',
  Wink = 'wink',
  WinkWacky = 'winkWacky',
  XDizzy = 'xDizzy'
}

export enum FacialHair {
  BeardLight = 'beardLight',
  BeardMajestic = 'beardMajestic',
  BeardMedium = 'beardMedium',
  Fancy = 'fancy',
  Light = 'light',
  Magnum = 'magnum',
  Majestic = 'majestic',
  Medium = 'medium',
  MoustaceFancy = 'moustaceFancy',
  MoustacheMagnum = 'moustacheMagnum'
}

export enum FacialHairColor {
  Auburn = 'auburn',
  Black = 'black',
  Blonde = 'blonde',
  BlondeGolden = 'blondeGolden',
  Brown = 'brown',
  BrownDark = 'brownDark',
  Gray = 'gray',
  Pastel = 'pastel',
  PastelPink = 'pastelPink',
  Platinum = 'platinum',
  Red = 'red',
  SilverGray = 'silverGray'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export enum HairColor {
  Auburn = 'auburn',
  Black = 'black',
  Blonde = 'blonde',
  BlondeGolden = 'blondeGolden',
  Brown = 'brown',
  BrownDark = 'brownDark',
  Gray = 'gray',
  Pastel = 'pastel',
  PastelPink = 'pastelPink',
  Platinum = 'platinum',
  Red = 'red',
  SilverGray = 'silverGray'
}

export enum HatColor {
  Black = 'black',
  Blue = 'blue',
  Blue01 = 'blue01',
  Blue02 = 'blue02',
  Blue03 = 'blue03',
  Gray = 'gray',
  Gray01 = 'gray01',
  Gray02 = 'gray02',
  Heather = 'heather',
  Pastel = 'pastel',
  PastelBlue = 'pastelBlue',
  PastelGreen = 'pastelGreen',
  PastelOrange = 'pastelOrange',
  PastelRed = 'pastelRed',
  PastelYellow = 'pastelYellow',
  Pink = 'pink',
  Red = 'red',
  White = 'white'
}

export type Meeting = {
  __typename?: 'Meeting';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  readTo: Scalars['String'];
  readToType: Scalars['String'];
  updatedAt: Scalars['String'];
  weekNumber: Scalars['Int'];
};

export type Member = {
  __typename?: 'Member';
  avatar: AvatarType;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MemberInputFields = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MemberResponse = {
  __typename?: 'MemberResponse';
  errors?: Maybe<Array<FieldError>>;
  member?: Maybe<Member>;
};

export enum Mouth {
  Concerned = 'concerned',
  Default = 'default',
  Disbelief = 'disbelief',
  Eating = 'eating',
  Grimace = 'grimace',
  Sad = 'sad',
  Scream = 'scream',
  ScreamOpen = 'screamOpen',
  Serious = 'serious',
  Smile = 'smile',
  Tongue = 'tongue',
  Twinkle = 'twinkle',
  Vomit = 'vomit'
}

export type Mutation = {
  __typename?: 'Mutation';
  createReading: Reading;
  deleteReading: Scalars['Boolean'];
  login?: Maybe<MemberResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<MemberResponse>;
  updateReading?: Maybe<Reading>;
};


export type MutationCreateReadingArgs = {
  author: Scalars['String'];
  title: Scalars['String'];
};


export type MutationDeleteReadingArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: MemberInputFields;
};


export type MutationRegisterArgs = {
  options: SignUpInputFields;
};


export type MutationUpdateReadingArgs = {
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Member>;
  reading?: Maybe<Reading>;
  readings: Array<Reading>;
};


export type QueryReadingArgs = {
  id: Scalars['Int'];
};

export type Reading = {
  __typename?: 'Reading';
  author: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  meetings: Array<Meeting>;
  rating: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SignUpInputFields = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export enum Skin {
  Black = 'black',
  Brown = 'brown',
  DarkBrown = 'darkBrown',
  Light = 'light',
  Pale = 'pale',
  Tanned = 'tanned',
  Yellow = 'yellow'
}

export enum Top {
  BigHair = 'bigHair',
  Bob = 'bob',
  Bun = 'bun',
  Curly = 'curly',
  Curvy = 'curvy',
  Dreads = 'dreads',
  Dreads01 = 'dreads01',
  Dreads02 = 'dreads02',
  Eyepatch = 'eyepatch',
  Frida = 'frida',
  Frizzle = 'frizzle',
  Fro = 'fro',
  FroAndBand = 'froAndBand',
  Hat = 'hat',
  Hijab = 'hijab',
  LongButNotTooLong = 'longButNotTooLong',
  LongHair = 'longHair',
  MiaWallace = 'miaWallace',
  Shaggy = 'shaggy',
  ShaggyMullet = 'shaggyMullet',
  ShavedSides = 'shavedSides',
  ShortCurly = 'shortCurly',
  ShortFlat = 'shortFlat',
  ShortHair = 'shortHair',
  ShortRound = 'shortRound',
  ShortWaved = 'shortWaved',
  Sides = 'sides',
  Straight01 = 'straight01',
  Straight02 = 'straight02',
  StraightAndStrand = 'straightAndStrand',
  TheCaesar = 'theCaesar',
  TheCaesarAndSidePart = 'theCaesarAndSidePart',
  Turban = 'turban',
  WinterHat01 = 'winterHat01',
  WinterHat02 = 'winterHat02',
  WinterHat03 = 'winterHat03',
  WinterHat04 = 'winterHat04'
}

export type BasicFieldMemberFragment = { __typename?: 'Member', id: number, name: string, avatar: { __typename?: 'AvatarType', isSet: boolean, options?: { __typename?: 'AvatarOptionsType', top: Array<Top>, hatColor?: Array<HatColor> | null | undefined, hairColor: Array<HairColor>, accessories?: Array<Accessories> | null | undefined, accessoriesColor?: Array<AccessoriesColor> | null | undefined, facialHair?: Array<FacialHair> | null | undefined, facialHairColor?: Array<FacialHairColor> | null | undefined, clothes: Array<Clothes>, clothesColor: Array<ClothesColor>, clotheGraphics?: Array<ClotheGraphics> | null | undefined, eyes?: Array<Eyes> | null | undefined, eyebrow?: Array<Eyebrow> | null | undefined, mouth?: Array<Mouth> | null | undefined, skin: Array<Skin> } | null | undefined } };

export type ReadingStandardFragment = { __typename?: 'Reading', id: number, createdAt: string, updatedAt: string, title: string, author: string };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'MemberResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, member?: { __typename?: 'Member', id: number, name: string, avatar: { __typename?: 'AvatarType', isSet: boolean, options?: { __typename?: 'AvatarOptionsType', top: Array<Top>, hatColor?: Array<HatColor> | null | undefined, hairColor: Array<HairColor>, accessories?: Array<Accessories> | null | undefined, accessoriesColor?: Array<AccessoriesColor> | null | undefined, facialHair?: Array<FacialHair> | null | undefined, facialHairColor?: Array<FacialHairColor> | null | undefined, clothes: Array<Clothes>, clothesColor: Array<ClothesColor>, clotheGraphics?: Array<ClotheGraphics> | null | undefined, eyes?: Array<Eyes> | null | undefined, eyebrow?: Array<Eyebrow> | null | undefined, mouth?: Array<Mouth> | null | undefined, skin: Array<Skin> } | null | undefined } } | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateReadingMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
}>;


export type CreateReadingMutation = { __typename?: 'Mutation', createReading: { __typename?: 'Reading', id: number, title: string, author: string, createdAt: string } };

export type DeleteReadingMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteReadingMutation = { __typename?: 'Mutation', deleteReading: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'MemberResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, member?: { __typename?: 'Member', id: number, name: string, avatar: { __typename?: 'AvatarType', isSet: boolean, options?: { __typename?: 'AvatarOptionsType', top: Array<Top>, hatColor?: Array<HatColor> | null | undefined, hairColor: Array<HairColor>, accessories?: Array<Accessories> | null | undefined, accessoriesColor?: Array<AccessoriesColor> | null | undefined, facialHair?: Array<FacialHair> | null | undefined, facialHairColor?: Array<FacialHairColor> | null | undefined, clothes: Array<Clothes>, clothesColor: Array<ClothesColor>, clotheGraphics?: Array<ClotheGraphics> | null | undefined, eyes?: Array<Eyes> | null | undefined, eyebrow?: Array<Eyebrow> | null | undefined, mouth?: Array<Mouth> | null | undefined, skin: Array<Skin> } | null | undefined } } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Member', id: number, name: string, avatar: { __typename?: 'AvatarType', isSet: boolean, options?: { __typename?: 'AvatarOptionsType', top: Array<Top>, hatColor?: Array<HatColor> | null | undefined, hairColor: Array<HairColor>, accessories?: Array<Accessories> | null | undefined, accessoriesColor?: Array<AccessoriesColor> | null | undefined, facialHair?: Array<FacialHair> | null | undefined, facialHairColor?: Array<FacialHairColor> | null | undefined, clothes: Array<Clothes>, clothesColor: Array<ClothesColor>, clotheGraphics?: Array<ClotheGraphics> | null | undefined, eyes?: Array<Eyes> | null | undefined, eyebrow?: Array<Eyebrow> | null | undefined, mouth?: Array<Mouth> | null | undefined, skin: Array<Skin> } | null | undefined } } | null | undefined };

export type AllReadingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllReadingsQuery = { __typename?: 'Query', readings: Array<{ __typename?: 'Reading', id: number, createdAt: string, updatedAt: string, title: string, author: string }> };

export type ReadingQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadingQuery = { __typename?: 'Query', reading?: { __typename?: 'Reading', id: number, createdAt: string, updatedAt: string, title: string, author: string } | null | undefined };

export const BasicFieldMemberFragmentDoc = gql`
    fragment BasicFieldMember on Member {
  id
  name
  avatar {
    isSet
    options {
      top
      hatColor
      hairColor
      accessories
      accessoriesColor
      facialHair
      facialHairColor
      clothes
      clothesColor
      clotheGraphics
      eyes
      eyebrow
      mouth
      skin
    }
  }
}
    `;
export const ReadingStandardFragmentDoc = gql`
    fragment ReadingStandard on Reading {
  id
  createdAt
  updatedAt
  title
  author
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    member {
      ...BasicFieldMember
    }
  }
}
    ${BasicFieldMemberFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateReadingDocument = gql`
    mutation CreateReading($title: String!, $author: String!) {
  createReading(title: $title, author: $author) {
    id
    title
    author
    createdAt
  }
}
    `;

export function useCreateReadingMutation() {
  return Urql.useMutation<CreateReadingMutation, CreateReadingMutationVariables>(CreateReadingDocument);
};
export const DeleteReadingDocument = gql`
    mutation DeleteReading {
  deleteReading(id: 1)
}
    `;

export function useDeleteReadingMutation() {
  return Urql.useMutation<DeleteReadingMutation, DeleteReadingMutationVariables>(DeleteReadingDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
  register(options: {email: $email, password: $password, name: $name}) {
    errors {
      field
      message
    }
    member {
      ...BasicFieldMember
    }
  }
}
    ${BasicFieldMemberFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...BasicFieldMember
  }
}
    ${BasicFieldMemberFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const AllReadingsDocument = gql`
    query AllReadings {
  readings {
    ...ReadingStandard
  }
}
    ${ReadingStandardFragmentDoc}`;

export function useAllReadingsQuery(options: Omit<Urql.UseQueryArgs<AllReadingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllReadingsQuery>({ query: AllReadingsDocument, ...options });
};
export const ReadingDocument = gql`
    query Reading($id: Int!) {
  reading(id: $id) {
    ...ReadingStandard
  }
}
    ${ReadingStandardFragmentDoc}`;

export function useReadingQuery(options: Omit<Urql.UseQueryArgs<ReadingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReadingQuery>({ query: ReadingDocument, ...options });
};