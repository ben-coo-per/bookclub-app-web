import Avatar from "boring-avatars";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedMeeting,
  updateMeetingAttendance,
} from "src/features/meetings/meetingSlice";
import {
  AttendanceType,
  useAddAttendanceRecordMutation,
  User,
} from "src/generated/graphql";
import { AttendanceSelector } from "./AttendanceInputSelector";
import { AttendanceRecordUser } from "./MeetingsAttendance";

export type AttendanceOption = `${AttendanceType}`; // turns enum from gen graphql to string litereal type

interface UserAttendanceCardProps extends AttendanceRecordUser {}

export const UserAttendanceCard = ({ user }: UserAttendanceCardProps) => {
  const [, addAttendanceRecordMutation] = useAddAttendanceRecordMutation();
  const meeting = useSelector(selectedMeeting);
  const attendanceSelection = meeting?.attendanceRecords?.filter(
    (ar) => ar.user.id == user.id
  )[0]?.attendanceState;

  const dispatch = useDispatch();

  async function handleSetAttendanceSelection(
    attendanceSelection: AttendanceType
  ) {
    if (meeting) {
      const { data } = await addAttendanceRecordMutation({
        meetingId: meeting.id,
        userId: user.id,
        attendanceState: attendanceSelection,
      });

      if (data?.addAttendanceRecord?.attendanceState) {
        dispatch(
          updateMeetingAttendance({
            meetingId: meeting.id,
            attendanceRecord: {
              user: user,
              attendanceState: data?.addAttendanceRecord?.attendanceState,
            },
          })
        );
      }
    }
  }

  // console.log(useSelector(selectMeetings).meetings);

  return (
    <div className="py-4 px-2 md:px-6 w-full md:w-auto grid grid-cols-4 gap-2 gap-y-4 md:grid-cols-1 bg-white shadow-lg border border-accent rounded-xl items-center justify-items-stretch">
      <div className="flex flex-col items-center ">
        <Avatar
          size={60}
          name={user.name}
          variant="bauhaus"
          colors={["#1A2557", "#2415CD", "#F2E3CB", "#AE3028", "#DFC640"]}
        />
      </div>

      <h2 className="text-xl md:text-center">{user.name}</h2>
      <AttendanceSelector
        attendanceSelection={attendanceSelection || "absent"}
        setAttendanceSelection={handleSetAttendanceSelection}
      />
    </div>
  );
};
