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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new rating */
  addRating: Rating;
  changePassword: UserResponse;
  /** Create a new Reading */
  createReading: Reading;
  /** Delete an existing Reading */
  deleteReading: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<UserResponse>;
  /** Update an existing rating */
  updateRating: Rating;
  /** Update an existing Reading */
  updateReading?: Maybe<Reading>;
};


export type MutationAddRatingArgs = {
  input: RatingInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateReadingArgs = {
  data: ReadingInput;
};


export type MutationDeleteReadingArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UserInputFields;
};


export type MutationRegisterArgs = {
  options: SignUpInputFields;
};


export type MutationUpdateRatingArgs = {
  id: Scalars['Int'];
  newRating: Scalars['Int'];
};


export type MutationUpdateReadingArgs = {
  data: UpdateReadingInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all Readings */
  allReadings: Array<Reading>;
  /** Get all Readings */
  currentlyReading: Array<Reading>;
  me?: Maybe<User>;
  /** Get Ratings on a Reading based on given ID */
  rating: Array<Rating>;
  /** Get Reading based on given ID */
  reading?: Maybe<Reading>;
  /** Get Ratings on a Reading based on given ID and userID */
  userRating: Rating;
};


export type QueryRatingArgs = {
  id: Scalars['Int'];
};


export type QueryReadingArgs = {
  id: Scalars['Int'];
};


export type QueryUserRatingArgs = {
  readingId: Scalars['Int'];
};

export type Rating = {
  __typename?: 'Rating';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  /** User's rating from 1 to 5 */
  rating: Scalars['Int'];
  readingId: Scalars['Int'];
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
};

export type RatingInput = {
  rating: Scalars['Float'];
  readingId: Scalars['Float'];
};

/** A Reading the club has completed. Could be a book, article, play, etc. */
export type Reading = {
  __typename?: 'Reading';
  author: Scalars['String'];
  avgRating?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  currentlyReading: Scalars['Boolean'];
  id: Scalars['Int'];
  title: Scalars['String'];
  type?: Maybe<ReadingType>;
  updatedAt: Scalars['String'];
};

export type ReadingInput = {
  author: Scalars['String'];
  title: Scalars['String'];
  type?: Maybe<ReadingType>;
};

/** The different options for the type of reading */
export enum ReadingType {
  NonFiction = 'nonFiction',
  Novel = 'novel',
  Play = 'play'
}

export type SignUpInputFields = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateReadingInput = {
  author?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ReadingType>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInputFields = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type StandardReadingFragment = { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string };

export type StandardErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, name: string };

export type StandardUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined };

export type AddRatingMutationVariables = Exact<{
  rating: Scalars['Float'];
  readingId: Scalars['Float'];
}>;


export type AddRatingMutation = { __typename?: 'Mutation', addRating: { __typename?: 'Rating', id: number, readingId: number, rating: number } };

export type UpdateRatingMutationVariables = Exact<{
  id: Scalars['Int'];
  newRating: Scalars['Int'];
}>;


export type UpdateRatingMutation = { __typename?: 'Mutation', updateRating: { __typename?: 'Rating', id: number, rating: number, readingId: number } };

export type CreateReadingMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
  type?: Maybe<ReadingType>;
}>;


export type CreateReadingMutation = { __typename?: 'Mutation', createReading: { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string } };

export type DeleteReadingMutationVariables = Exact<{
  ids: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type DeleteReadingMutation = { __typename?: 'Mutation', deleteReading: boolean };

export type UpdateReadingMutationVariables = Exact<{
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  type?: Maybe<ReadingType>;
  id: Scalars['Int'];
}>;


export type UpdateReadingMutation = { __typename?: 'Mutation', updateReading?: { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string } | null | undefined };

export type GetUserRatingQueryVariables = Exact<{
  readingId: Scalars['Int'];
}>;


export type GetUserRatingQuery = { __typename?: 'Query', userRating: { __typename?: 'Rating', id: number, userId: number, readingId: number, rating: number } };

export type AllReadingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllReadingsQuery = { __typename?: 'Query', allReadings: Array<{ __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string }> };

export type CurrentlyReadingQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentlyReadingQuery = { __typename?: 'Query', currentlyReading: Array<{ __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string }> };

export type ReadingQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadingQuery = { __typename?: 'Query', reading?: { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string } | null | undefined };

export const StandardReadingFragmentDoc = gql`
    fragment StandardReading on Reading {
  id
  title
  author
  type
  avgRating
  currentlyReading
  createdAt
  updatedAt
}
    `;
export const StandardErrorFragmentDoc = gql`
    fragment StandardError on FieldError {
  field
  message
}
    `;
export const StandardUserFragmentDoc = gql`
    fragment StandardUser on User {
  id
  name
}
    `;
export const StandardUserResponseFragmentDoc = gql`
    fragment StandardUserResponse on UserResponse {
  errors {
    ...StandardError
  }
  user {
    ...StandardUser
  }
}
    ${StandardErrorFragmentDoc}
${StandardUserFragmentDoc}`;
export const AddRatingDocument = gql`
    mutation AddRating($rating: Float!, $readingId: Float!) {
  addRating(input: {rating: $rating, readingId: $readingId}) {
    id
    readingId
    rating
  }
}
    `;

export function useAddRatingMutation() {
  return Urql.useMutation<AddRatingMutation, AddRatingMutationVariables>(AddRatingDocument);
};
export const UpdateRatingDocument = gql`
    mutation UpdateRating($id: Int!, $newRating: Int!) {
  updateRating(id: $id, newRating: $newRating) {
    id
    rating
    readingId
  }
}
    `;

export function useUpdateRatingMutation() {
  return Urql.useMutation<UpdateRatingMutation, UpdateRatingMutationVariables>(UpdateRatingDocument);
};
export const CreateReadingDocument = gql`
    mutation CreateReading($title: String!, $author: String!, $type: ReadingType) {
  createReading(data: {title: $title, author: $author, type: $type}) {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function useCreateReadingMutation() {
  return Urql.useMutation<CreateReadingMutation, CreateReadingMutationVariables>(CreateReadingDocument);
};
export const DeleteReadingDocument = gql`
    mutation DeleteReading($ids: [Int!]!) {
  deleteReading(ids: $ids)
}
    `;

export function useDeleteReadingMutation() {
  return Urql.useMutation<DeleteReadingMutation, DeleteReadingMutationVariables>(DeleteReadingDocument);
};
export const UpdateReadingDocument = gql`
    mutation UpdateReading($title: String, $author: String, $type: ReadingType, $id: Int!) {
  updateReading(data: {title: $title, author: $author, type: $type}, id: $id) {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function useUpdateReadingMutation() {
  return Urql.useMutation<UpdateReadingMutation, UpdateReadingMutationVariables>(UpdateReadingDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(options: {email: $email, password: $password}) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

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
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $name: String!) {
  register(options: {email: $email, password: $password, name: $name}) {
    ...StandardUserResponse
  }
}
    ${StandardUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const GetUserRatingDocument = gql`
    query getUserRating($readingId: Int!) {
  userRating(readingId: $readingId) {
    id
    userId
    readingId
    rating
  }
}
    `;

export function useGetUserRatingQuery(options: Omit<Urql.UseQueryArgs<GetUserRatingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserRatingQuery>({ query: GetUserRatingDocument, ...options });
};
export const AllReadingsDocument = gql`
    query AllReadings {
  allReadings {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function useAllReadingsQuery(options: Omit<Urql.UseQueryArgs<AllReadingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllReadingsQuery>({ query: AllReadingsDocument, ...options });
};
export const CurrentlyReadingDocument = gql`
    query CurrentlyReading {
  currentlyReading {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function useCurrentlyReadingQuery(options: Omit<Urql.UseQueryArgs<CurrentlyReadingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentlyReadingQuery>({ query: CurrentlyReadingDocument, ...options });
};
export const ReadingDocument = gql`
    query Reading($id: Int!) {
  reading(id: $id) {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function useReadingQuery(options: Omit<Urql.UseQueryArgs<ReadingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReadingQuery>({ query: ReadingDocument, ...options });
};