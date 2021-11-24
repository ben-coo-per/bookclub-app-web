import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allMeetings,
  hydrateMeetings,
} from "src/features/meetings/meetingSlice";
import { useCurrentReadingMeetingsQuery } from "src/generated/graphql";
import { AddMeetingButton } from "./AddMeetingButton";
import { MeetingIndicator } from "./MeetingIndicator";
import { SelectedMeetingDetail } from "./SelectedMeetingDetail";

export const CurrentMeetingsContainer = () => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const dispatch = useDispatch();

  const [{ data }] = useCurrentReadingMeetingsQuery();
  useEffect(() => {
    if (firstLoad && data?.currentReadingMeetings) {
      dispatch(hydrateMeetings(data.currentReadingMeetings));
      setFirstLoad(false);
    }
  }, [data?.currentReadingMeetings]);

  const currentMeetings = useSelector(allMeetings);
  return (
    <div className="flex flex-col col-span-5 md:col-span-2 bg-white p-5 rounded-xl shadow-lg gap-2">
      <div className="flex flex-row justify-between items-center ">
        <h2 className="text-darkBlue text-3xl font-bold truncate">Meetings</h2>
        <AddMeetingButton />
      </div>

      <div className="flex flex-wrap gap-1">
        {currentMeetings.map((meeting, index) => {
          return (
            <MeetingIndicator
              key={index}
              meetingNum={index + 1}
              thisMeeting={meeting}
            />
          );
        })}
      </div>
      <SelectedMeetingDetail />
    </div>
  );
};
