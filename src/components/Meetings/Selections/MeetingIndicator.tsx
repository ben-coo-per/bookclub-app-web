import { useDispatch, useSelector } from "react-redux";
import {
  selectedMeeting,
  setSelectedMeeting,
} from "src/features/meetings/meetingSlice";
import { Meeting } from "src/generated/graphql";
import { mapToMonth } from "src/utils/mapToMonth";

interface MeetingIndicatorProps {
  thisMeeting: Meeting;
}

export const MeetingIndicator = ({ thisMeeting }: MeetingIndicatorProps) => {
  const isSelectedMeeting = useSelector(selectedMeeting)?.id === thisMeeting.id;
  const dispatch = useDispatch();

  function handleSetSelectedMeeting() {
    dispatch(setSelectedMeeting(thisMeeting));
  }

  const day = new Date(parseInt(thisMeeting.meetingDate)).getDate();
  const month = mapToMonth(
    new Date(parseInt(thisMeeting.meetingDate)).getMonth()
  );

  return (
    <div
      className={`${
        isSelectedMeeting
          ? "bg-darkBlue shadow-xl -mt-2"
          : "bg-white border border-darkAccent shadow-sm"
      } rounded-lg p-3 w-12 flex flex-col items-center justify-center font-bold cursor-pointer font-sans gap-2`}
      onClick={handleSetSelectedMeeting}
    >
      <div
        className={`${
          isSelectedMeeting ? "text-champagne" : "text-subtleText"
        } leading-4 text-xs `}
        onClick={handleSetSelectedMeeting}
      >
        {month}
      </div>
      <div
        className={`${
          isSelectedMeeting ? "text-white" : "border-darkBlue"
        } leading-4 text-2xl`}
      >
        {day}
      </div>
    </div>
  );
};
