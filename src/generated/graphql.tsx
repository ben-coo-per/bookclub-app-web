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

export type AllMeetingsResponse = {
  __typename?: 'AllMeetingsResponse';
  meetings?: Maybe<Array<Meeting>>;
  nextCursor?: Maybe<Scalars['String']>;
  previousCursor?: Maybe<Scalars['String']>;
};

/** An attendance record linking a user to a meeting  */
export type Attendance = {
  __typename?: 'Attendance';
  attendanceState?: Maybe<AttendanceType>;
  isDiscussionLeader?: Maybe<Scalars['Boolean']>;
  meetingId: Scalars['Float'];
  userId: Scalars['Float'];
};

/** The different options to describe the user's attendance */
export enum AttendanceType {
  Absent = 'absent',
  Excused = 'excused',
  Present = 'present'
}

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

/** A Meeting  */
export type Meeting = {
  __typename?: 'Meeting';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  meetingDate: Scalars['String'];
  meetingLink?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type MeetingInput = {
  meetingDate?: Maybe<Scalars['String']>;
  meetingLink?: Maybe<Scalars['String']>;
  readingAssignments?: Maybe<Array<ReadingAssignment>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttendanceRecord?: Maybe<Attendance>;
  /** Create a new rating */
  addRating: RatingResponse;
  changePassword: UserResponse;
  createMeeting: Meeting;
  /** Create a new Reading */
  createReading: Reading;
  deleteMeeting: Scalars['Boolean'];
  /** Delete an existing Reading */
  deleteReading: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  register?: Maybe<UserResponse>;
  removeReadingFromMeeting: Scalars['Boolean'];
  updateMeeting: Meeting;
  /** Update an existing rating */
  updateRating?: Maybe<RatingResponse>;
  /** Update an existing Reading */
  updateReading?: Maybe<Reading>;
};


export type MutationAddAttendanceRecordArgs = {
  attendanceState?: Maybe<AttendanceType>;
  meetingId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationAddRatingArgs = {
  input: RatingInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateMeetingArgs = {
  meetingInput: MeetingInput;
};


export type MutationCreateReadingArgs = {
  data: ReadingInput;
};


export type MutationDeleteMeetingArgs = {
  meetingId: Scalars['Int'];
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


export type MutationRemoveReadingFromMeetingArgs = {
  meetingId: Scalars['Int'];
  readingId: Scalars['Int'];
};


export type MutationUpdateMeetingArgs = {
  id: Scalars['Int'];
  meetingInput: MeetingInput;
};


export type MutationUpdateRatingArgs = {
  id: Scalars['Int'];
  newRating: Scalars['Int'];
};


export type MutationUpdateReadingArgs = {
  data: ReadingInput;
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  /** Get all Meetings */
  allMeetings: AllMeetingsResponse;
  allUsers: Array<User>;
  /** Get all Current Readings */
  currentlyReading: Array<Reading>;
  me?: Maybe<User>;
  meetingUsersAttendance: Array<UserAttendanceResponse>;
  /** Get meetings by month */
  meetingsByMonth: AllMeetingsResponse;
  /** Get all Readings */
  previousReadings: Array<Reading>;
  /** Get Ratings on a Reading based on given ID */
  rating: Array<Rating>;
  /** Get Reading based on given ID */
  reading?: Maybe<Reading>;
  readingAssignments: Array<ReadingAssignmentsResponse>;
  /** Get Ratings on a Reading based on given ID and userID */
  userRating: Rating;
};


export type QueryAllMeetingsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryMeetingUsersAttendanceArgs = {
  meetingId?: Maybe<Scalars['Int']>;
};


export type QueryMeetingsByMonthArgs = {
  cursor?: Maybe<Scalars['String']>;
};


export type QueryPreviousReadingsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryRatingArgs = {
  id: Scalars['Int'];
};


export type QueryReadingArgs = {
  id: Scalars['Int'];
};


export type QueryReadingAssignmentsArgs = {
  meetingId?: Maybe<Scalars['Int']>;
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
  rating: Scalars['Int'];
  readingId: Scalars['Int'];
};

export type RatingResponse = {
  __typename?: 'RatingResponse';
  avgRating?: Maybe<Scalars['Float']>;
  rating?: Maybe<Rating>;
};

/** A Reading that the group either completed or are currently reading. Could be a book, article, play, etc. */
export type Reading = {
  __typename?: 'Reading';
  author: Scalars['String'];
  avgRating?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  createdBy?: Maybe<Scalars['Int']>;
  currentlyReading: Scalars['Boolean'];
  id: Scalars['Int'];
  title: Scalars['String'];
  type?: Maybe<ReadingType>;
  updatedAt: Scalars['String'];
};

export type ReadingAssignment = {
  readingAssignmentEnd?: Maybe<Scalars['String']>;
  readingAssignmentStart?: Maybe<Scalars['String']>;
  readingAssignmentType?: Maybe<Scalars['String']>;
  readingId: Scalars['Float'];
};

export type ReadingAssignmentsResponse = {
  __typename?: 'ReadingAssignmentsResponse';
  author?: Maybe<Scalars['String']>;
  meetingDate?: Maybe<Scalars['String']>;
  meetingId: Scalars['Float'];
  readingAssignmentEnd?: Maybe<Scalars['String']>;
  readingAssignmentStart?: Maybe<Scalars['String']>;
  readingAssignmentType?: Maybe<Scalars['String']>;
  readingId: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type ReadingInput = {
  author?: Maybe<Scalars['String']>;
  currentlyReading?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
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

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserAttendanceResponse = {
  __typename?: 'UserAttendanceResponse';
  attendanceState: AttendanceType;
  user: User;
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

export type StandardMeetingFragment = { __typename?: 'Meeting', id: number, meetingDate: string, meetingLink?: string | null | undefined, createdAt: string, updatedAt: string };

export type StandardRatingFragment = { __typename?: 'Rating', rating: number, id: number, userId: number, readingId: number };

export type StandardReadingFragment = { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string };

export type StandardErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type StandardUserFragment = { __typename?: 'User', id: number, name: string };

export type StandardUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, name: string } | null | undefined };

export type AddAttendanceRecordMutationVariables = Exact<{
  meetingId: Scalars['Int'];
  userId: Scalars['Int'];
  attendanceState?: Maybe<AttendanceType>;
}>;


export type AddAttendanceRecordMutation = { __typename?: 'Mutation', addAttendanceRecord?: { __typename?: 'Attendance', userId: number, meetingId: number, attendanceState?: AttendanceType | null | undefined, isDiscussionLeader?: boolean | null | undefined } | null | undefined };

export type CreateMeetingMutationVariables = Exact<{
  meetingDate: Scalars['String'];
  readingAssignments?: Maybe<Array<ReadingAssignment> | ReadingAssignment>;
  meetingLink?: Maybe<Scalars['String']>;
}>;


export type CreateMeetingMutation = { __typename?: 'Mutation', createMeeting: { __typename?: 'Meeting', id: number, meetingDate: string, meetingLink?: string | null | undefined, createdAt: string, updatedAt: string } };

export type DeleteMeetingMutationVariables = Exact<{
  meetingId: Scalars['Int'];
}>;


export type DeleteMeetingMutation = { __typename?: 'Mutation', deleteMeeting: boolean };

export type RemoveReadingFromMeetingMutationVariables = Exact<{
  readingId: Scalars['Int'];
  meetingId: Scalars['Int'];
}>;


export type RemoveReadingFromMeetingMutation = { __typename?: 'Mutation', removeReadingFromMeeting: boolean };

export type UpdateMeetingMutationVariables = Exact<{
  meetingDate?: Maybe<Scalars['String']>;
  readingAssignments?: Maybe<Array<ReadingAssignment> | ReadingAssignment>;
  meetingLink?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
}>;


export type UpdateMeetingMutation = { __typename?: 'Mutation', updateMeeting: { __typename?: 'Meeting', id: number, meetingDate: string, meetingLink?: string | null | undefined, createdAt: string, updatedAt: string } };

export type AddRatingMutationVariables = Exact<{
  readingId: Scalars['Int'];
  rating: Scalars['Int'];
}>;


export type AddRatingMutation = { __typename?: 'Mutation', addRating: { __typename?: 'RatingResponse', avgRating?: number | null | undefined, rating?: { __typename?: 'Rating', rating: number, id: number, userId: number, readingId: number } | null | undefined } };

export type UpdateRatingMutationVariables = Exact<{
  id: Scalars['Int'];
  newRating: Scalars['Int'];
}>;


export type UpdateRatingMutation = { __typename?: 'Mutation', updateRating?: { __typename?: 'RatingResponse', avgRating?: number | null | undefined, rating?: { __typename?: 'Rating', rating: number, id: number, userId: number, readingId: number } | null | undefined } | null | undefined };

export type CreateReadingMutationVariables = Exact<{
  title: Scalars['String'];
  author: Scalars['String'];
  currentlyReading?: Maybe<Scalars['Boolean']>;
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
  currentlyReading?: Maybe<Scalars['Boolean']>;
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

export type AllMeetingsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type AllMeetingsQuery = { __typename?: 'Query', allMeetings: { __typename?: 'AllMeetingsResponse', previousCursor?: string | null | undefined, nextCursor?: string | null | undefined, meetings?: Array<{ __typename?: 'Meeting', id: number, meetingDate: string, meetingLink?: string | null | undefined, createdAt: string, updatedAt: string }> | null | undefined } };

export type MeetingUsersAttendanceQueryVariables = Exact<{
  meetingId?: Maybe<Scalars['Int']>;
}>;


export type MeetingUsersAttendanceQuery = { __typename?: 'Query', meetingUsersAttendance: Array<{ __typename?: 'UserAttendanceResponse', attendanceState: AttendanceType, user: { __typename?: 'User', id: number, name: string } }> };

export type ReadingAssignmentsQueryVariables = Exact<{
  meetingId?: Maybe<Scalars['Int']>;
}>;


export type ReadingAssignmentsQuery = { __typename?: 'Query', readingAssignments: Array<{ __typename?: 'ReadingAssignmentsResponse', readingId: number, meetingId: number, readingAssignmentType?: string | null | undefined, readingAssignmentStart?: string | null | undefined, readingAssignmentEnd?: string | null | undefined, author?: string | null | undefined, title?: string | null | undefined }> };

export type GetUserRatingQueryVariables = Exact<{
  readingId: Scalars['Int'];
}>;


export type GetUserRatingQuery = { __typename?: 'Query', userRating: { __typename?: 'Rating', rating: number, id: number, userId: number, readingId: number } };

export type PreviousReadingsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PreviousReadingsQuery = { __typename?: 'Query', previousReadings: Array<{ __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string }> };

export type CurrentlyReadingQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentlyReadingQuery = { __typename?: 'Query', currentlyReading: Array<{ __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string }> };

export type ReadingQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReadingQuery = { __typename?: 'Query', reading?: { __typename?: 'Reading', id: number, title: string, author: string, type?: ReadingType | null | undefined, avgRating?: number | null | undefined, currentlyReading: boolean, createdAt: string, updatedAt: string } | null | undefined };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, name: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string } | null | undefined };

export const StandardMeetingFragmentDoc = gql`
    fragment StandardMeeting on Meeting {
  id
  meetingDate
  meetingLink
  createdAt
  updatedAt
}
    `;
export const StandardRatingFragmentDoc = gql`
    fragment StandardRating on Rating {
  rating
  id
  userId
  readingId
}
    `;
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
export const AddAttendanceRecordDocument = gql`
    mutation AddAttendanceRecord($meetingId: Int!, $userId: Int!, $attendanceState: AttendanceType) {
  addAttendanceRecord(
    meetingId: $meetingId
    userId: $userId
    attendanceState: $attendanceState
  ) {
    userId
    meetingId
    attendanceState
    isDiscussionLeader
  }
}
    `;

export function useAddAttendanceRecordMutation() {
  return Urql.useMutation<AddAttendanceRecordMutation, AddAttendanceRecordMutationVariables>(AddAttendanceRecordDocument);
};
export const CreateMeetingDocument = gql`
    mutation CreateMeeting($meetingDate: String!, $readingAssignments: [ReadingAssignment!], $meetingLink: String) {
  createMeeting(
    meetingInput: {meetingDate: $meetingDate, readingAssignments: $readingAssignments, meetingLink: $meetingLink}
  ) {
    ...StandardMeeting
  }
}
    ${StandardMeetingFragmentDoc}`;

export function useCreateMeetingMutation() {
  return Urql.useMutation<CreateMeetingMutation, CreateMeetingMutationVariables>(CreateMeetingDocument);
};
export const DeleteMeetingDocument = gql`
    mutation DeleteMeeting($meetingId: Int!) {
  deleteMeeting(meetingId: $meetingId)
}
    `;

export function useDeleteMeetingMutation() {
  return Urql.useMutation<DeleteMeetingMutation, DeleteMeetingMutationVariables>(DeleteMeetingDocument);
};
export const RemoveReadingFromMeetingDocument = gql`
    mutation RemoveReadingFromMeeting($readingId: Int!, $meetingId: Int!) {
  removeReadingFromMeeting(meetingId: $meetingId, readingId: $readingId)
}
    `;

export function useRemoveReadingFromMeetingMutation() {
  return Urql.useMutation<RemoveReadingFromMeetingMutation, RemoveReadingFromMeetingMutationVariables>(RemoveReadingFromMeetingDocument);
};
export const UpdateMeetingDocument = gql`
    mutation UpdateMeeting($meetingDate: String, $readingAssignments: [ReadingAssignment!], $meetingLink: String, $id: Int!) {
  updateMeeting(
    id: $id
    meetingInput: {meetingDate: $meetingDate, readingAssignments: $readingAssignments, meetingLink: $meetingLink}
  ) {
    ...StandardMeeting
  }
}
    ${StandardMeetingFragmentDoc}`;

export function useUpdateMeetingMutation() {
  return Urql.useMutation<UpdateMeetingMutation, UpdateMeetingMutationVariables>(UpdateMeetingDocument);
};
export const AddRatingDocument = gql`
    mutation AddRating($readingId: Int!, $rating: Int!) {
  addRating(input: {rating: $rating, readingId: $readingId}) {
    rating {
      ...StandardRating
    }
    avgRating
  }
}
    ${StandardRatingFragmentDoc}`;

export function useAddRatingMutation() {
  return Urql.useMutation<AddRatingMutation, AddRatingMutationVariables>(AddRatingDocument);
};
export const UpdateRatingDocument = gql`
    mutation UpdateRating($id: Int!, $newRating: Int!) {
  updateRating(id: $id, newRating: $newRating) {
    rating {
      ...StandardRating
    }
    avgRating
  }
}
    ${StandardRatingFragmentDoc}`;

export function useUpdateRatingMutation() {
  return Urql.useMutation<UpdateRatingMutation, UpdateRatingMutationVariables>(UpdateRatingDocument);
};
export const CreateReadingDocument = gql`
    mutation CreateReading($title: String!, $author: String!, $currentlyReading: Boolean, $type: ReadingType) {
  createReading(
    data: {title: $title, author: $author, currentlyReading: $currentlyReading, type: $type}
  ) {
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
    mutation UpdateReading($title: String, $author: String, $type: ReadingType, $id: Int!, $currentlyReading: Boolean) {
  updateReading(
    id: $id
    data: {author: $author, title: $title, type: $type, currentlyReading: $currentlyReading}
  ) {
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
export const AllMeetingsDocument = gql`
    query AllMeetings($cursor: String, $limit: Int!) {
  allMeetings(cursor: $cursor, limit: $limit) {
    meetings {
      ...StandardMeeting
    }
    previousCursor
    nextCursor
  }
}
    ${StandardMeetingFragmentDoc}`;

export function useAllMeetingsQuery(options: Omit<Urql.UseQueryArgs<AllMeetingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllMeetingsQuery>({ query: AllMeetingsDocument, ...options });
};
export const MeetingUsersAttendanceDocument = gql`
    query MeetingUsersAttendance($meetingId: Int) {
  meetingUsersAttendance(meetingId: $meetingId) {
    user {
      ...StandardUser
    }
    attendanceState
  }
}
    ${StandardUserFragmentDoc}`;

export function useMeetingUsersAttendanceQuery(options: Omit<Urql.UseQueryArgs<MeetingUsersAttendanceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeetingUsersAttendanceQuery>({ query: MeetingUsersAttendanceDocument, ...options });
};
export const ReadingAssignmentsDocument = gql`
    query readingAssignments($meetingId: Int) {
  readingAssignments(meetingId: $meetingId) {
    readingId
    meetingId
    meetingId
    readingAssignmentType
    readingAssignmentStart
    readingAssignmentEnd
    author
    title
  }
}
    `;

export function useReadingAssignmentsQuery(options: Omit<Urql.UseQueryArgs<ReadingAssignmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReadingAssignmentsQuery>({ query: ReadingAssignmentsDocument, ...options });
};
export const GetUserRatingDocument = gql`
    query getUserRating($readingId: Int!) {
  userRating(readingId: $readingId) {
    ...StandardRating
  }
}
    ${StandardRatingFragmentDoc}`;

export function useGetUserRatingQuery(options: Omit<Urql.UseQueryArgs<GetUserRatingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserRatingQuery>({ query: GetUserRatingDocument, ...options });
};
export const PreviousReadingsDocument = gql`
    query PreviousReadings($limit: Int!, $cursor: String) {
  previousReadings(limit: $limit, cursor: $cursor) {
    ...StandardReading
  }
}
    ${StandardReadingFragmentDoc}`;

export function usePreviousReadingsQuery(options: Omit<Urql.UseQueryArgs<PreviousReadingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PreviousReadingsQuery>({ query: PreviousReadingsDocument, ...options });
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
export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    ...StandardUser
  }
}
    ${StandardUserFragmentDoc}`;

export function useAllUsersQuery(options: Omit<Urql.UseQueryArgs<AllUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllUsersQuery>({ query: AllUsersDocument, ...options });
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