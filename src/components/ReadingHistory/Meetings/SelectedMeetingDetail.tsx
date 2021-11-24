import {
  CalendarIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextDataDisplay } from "src/components/textDataDisplay";
import { selectedMeeting } from "src/features/meetings/meetingSlice";
import { getMeetingIsHappening } from "src/utils/meetingTimeWindow";

interface SelectedMeetingDetailProps {}

export const SelectedMeetingDetail = ({}: SelectedMeetingDetailProps) => {
  const meeting = useSelector(selectedMeeting);
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
    <div className="flex flex-col bg-darkBlue p-2 rounded-xl">
      <div className="flex flex-row-reverse gap-2 text-champagne">
        {meetingIsHappening && (
          <button
            aria-label="go to meeting"
            className="cursor-pointer"
            onClick={handleGoToMeeting}
          >
            <ExternalLinkIcon className="h-5 " />
          </button>
        )}
        <button
          aria-label="go to attendance page"
          className="cursor-pointer"
          onClick={handleGoToAttendancePage}
        >
          <CalendarIcon className="h-5 " />
        </button>
        <button aria-label="edit meeting" className="cursor-pointer">
          <PencilIcon className="h-5 " />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 p-2 pt-0 -mt-1">
        <TextDataDisplay
          label="Read Through"
          darkMode
          className="col-span-1"
          truncate={false}
        >
          {meeting?.readThrough ? meeting.readThrough : "-"}
        </TextDataDisplay>

        <TextDataDisplay
          label="Meeting Date"
          darkMode
          truncate={false}
          className="col-span-1"
        >
          {dateTime != "-" ? dateTime.toDateString() : dateTime}
          <p className="text-sm font-normal -mt-1">
            {dateTime != "-"
              ? dateTime.toLocaleTimeString().replace(":00", "")
              : dateTime}
          </p>
        </TextDataDisplay>
      </div>
    </div>
  );
};
