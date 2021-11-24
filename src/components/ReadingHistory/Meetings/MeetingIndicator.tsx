import { useDispatch, useSelector } from "react-redux";
import {
  selectedMeeting,
  setSelectedMeeting,
} from "src/features/meetings/meetingSlice";
import { Meeting } from "src/generated/graphql";

interface MeetingIndicatorProps {
  meetingNum: number;
  thisMeeting: Meeting;
}

export const MeetingIndicator = ({
  meetingNum,
  thisMeeting,
}: MeetingIndicatorProps) => {
  const isSelectedMeeting = useSelector(selectedMeeting)?.id === thisMeeting.id;
  const dispatch = useDispatch();

  function handleSetSelectedMeeting() {
    dispatch(setSelectedMeeting(thisMeeting));
  }

  return (
    <div
      className={`${
        isSelectedMeeting
          ? "bg-darkBlue text-champagne"
          : "bg-accent text-darkBlue border-2 border-darkBlue"
      } rounded-full h-12 w-12 flex items-center justify-center text-3xl font-bold cursor-pointer font-sans`}
      onClick={handleSetSelectedMeeting}
    >
      {meetingNum}
    </div>
  );
};
