import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedMeeting,
  hydrateMeetingAttendance,
  selectMeetings,
} from "src/features/meetings/meetingSlice";
import {
  useAllUsersQuery,
  useMeetingUsersAttendanceQuery,
} from "src/generated/graphql";
import { AttendanceOption, UserAttendanceCard } from "./UserCard";

export interface AttendanceRecordUser {
  user: { name: string; id: number };
  attendanceState?: AttendanceOption;
}

export const MeetingAttendance = () => {
  const [allUsersResult] = useAllUsersQuery();
  const dispatch = useDispatch();
  const thisMeeting = useSelector(selectedMeeting);
  const [meetingUsersAttendanceResult] = useMeetingUsersAttendanceQuery({
    variables: { meetingId: thisMeeting?.id },
  });

  let usersToRender: AttendanceRecordUser[] = [];

  if (
    allUsersResult?.data?.allUsers &&
    meetingUsersAttendanceResult?.data?.meetingUsersAttendance
  ) {
    usersToRender = allUsersResult.data.allUsers.map((u) => {
      if (
        meetingUsersAttendanceResult.data?.meetingUsersAttendance.some(
          (user) => user.user?.id === u.id
        )
      )
        return meetingUsersAttendanceResult.data?.meetingUsersAttendance.filter(
          (user) => user.user.id === u.id
        )[0];

      return { user: { name: u.name, id: u.id }, attendanceState: "absent" };
    });
  }

  useEffect(() => {
    if (
      meetingUsersAttendanceResult.data?.meetingUsersAttendance &&
      thisMeeting
    ) {
      // If there is not already records in Redux store
      if (
        !thisMeeting.attendanceRecords ||
        thisMeeting.attendanceRecords?.length == 0
      ) {
        // add each result from the attendance result to store
        const attendanceRecords =
          meetingUsersAttendanceResult.data?.meetingUsersAttendance.map(
            (mua) => {
              return {
                user: { name: mua.user.name, id: mua.user.id },
                attendanceState: mua.attendanceState || "absent",
              };
            }
          );
        dispatch(
          hydrateMeetingAttendance({
            meetingId: thisMeeting.id,
            attendanceRecords: attendanceRecords,
          })
        );
      }
    }
  }, [meetingUsersAttendanceResult.data]);

  // if (thisMeeting?.attendanceRecords) {
  //   console.log(thisMeeting.attendanceRecords[0]?.attendanceState);
  // }

  // console.log(
  //   useSelector(selectMeetings).meetings.map((m) => m.attendanceRecords)
  // );

  return (
    <div className="flex flex-wrap gap-2">
      {usersToRender.map((u) => {
        return <UserAttendanceCard user={u.user} />;
      })}
    </div>
  );
};
