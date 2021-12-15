import {
  CalendarIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { TextDataDisplay } from "src/components/textDataDisplay";
import { selectedMeeting } from "src/features/meetings/meetingSlice";
import { useReadingAssignmentsQuery } from "src/generated/graphql";
import { getMeetingIsHappening } from "src/utils/meetingTimeWindow";
import { ReadingAssignmentRow } from "./ReadingAssingmentRow";

interface SelectedMeetingDetailProps {}

export const SelectedMeetingDetail = ({}: SelectedMeetingDetailProps) => {
  const meeting = useSelector(selectedMeeting);

  const [{ data }] = useReadingAssignmentsQuery({
    variables: {
      meetingId: meeting?.id,
    },
  });

  console.log(data?.readingAssignments);

  const dateTime = meeting?.meetingDate
    ? new Date(parseInt(meeting?.meetingDate))
    : "-";

  const meetingIsHappening = dateTime != "-" && getMeetingIsHappening(dateTime);

  function handleGoToMeeting() {
    console.log("go to meeting");
  }

  function handleGoToAttendancePage() {
    console.log("go to Attendance Page");
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.readingAssignments.map((ra) => (
        <ReadingAssignmentRow readingAssignment={ra} />
      ))}
    </div>
  );
};
