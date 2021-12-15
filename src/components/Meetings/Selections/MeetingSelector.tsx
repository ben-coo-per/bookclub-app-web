import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { AddMeetingButton } from "../AddMeetingButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMeetings,
  hydrateMeetings,
  appendNewMonthOfReadings,
  RichMeeting,
  paginationBackwards,
  paginationForwards,
} from "src/features/meetings/meetingSlice";
import { useAllMeetingsQuery } from "src/generated/graphql";
import useWindowDimensions from "src/utils/getWindowDimensions";
import { MeetingIndicator } from "./MeetingIndicator";

interface QueryVariables {
  cursor?: string | null;
  limit: number;
}

export const MeetingSelector = () => {
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const windowWidth = useWindowDimensions().width;
  const limit = Math.floor(0.0159 * windowWidth - 1.4667); // Equation to get the limit from the window width

  const [variables, setVariables] = useState<QueryVariables>({
    cursor: null,
    limit: limit,
  });

  const meetingsFromStore = useSelector(selectMeetings);

  let moreNewerMeetings = meetingsFromStore.next != null || undefined;
  let moreOlderMeetings = meetingsFromStore.previous != null || undefined;

  const [{ data, fetching }] = useAllMeetingsQuery({
    variables,
  });

  function getMeetingsBetweenCursors(meeting: RichMeeting) {
    if (meetingsFromStore.previous && meetingsFromStore.next) {
      return (
        meeting.meetingDate >= meetingsFromStore.previous &&
        meeting.meetingDate <= meetingsFromStore.next
      );
    }
    if (meetingsFromStore.previous) {
      return meeting.meetingDate >= meetingsFromStore.previous;
    }
    if (meetingsFromStore.next) {
      return meeting.meetingDate <= meetingsFromStore.next;
    }

    return meeting;
  }

  function handlePrevious() {
    // If there is already meetings within the date range in the store,
    // set the cursors to only render the that set of meetings
    const meetingsFromStoreAfterCursor = meetingsFromStore.meetings.filter(
      (meeting) => {
        if (meetingsFromStore.previous) {
          return meeting.meetingDate < meetingsFromStore.previous;
        }
      }
    );
    if (meetingsFromStoreAfterCursor.length > 0 && meetingsFromStore.previous) {
      dispatch(
        paginationBackwards({
          cursor: meetingsFromStore.previous,
          limit: limit,
        })
      );
    } else {
      // Else call DB & append the meetings to the store
      setVariables({ ...variables, cursor: meetingsFromStore.previous });
    }
  }

  function handleNext() {
    // There should always be meetings in the store for going forward in time. (bc the user must have navigated backwards first)
    // Set the cursors to only render the next set of meetings
    const meetingsFromStoreBeforeCursor = meetingsFromStore.meetings.filter(
      (meeting) => {
        if (meetingsFromStore.next) {
          return meeting.meetingDate >= meetingsFromStore.next;
        }
      }
    );

    if (meetingsFromStoreBeforeCursor.length > 0 && meetingsFromStore.next) {
      dispatch(
        paginationForwards({
          cursor: meetingsFromStore.next,
          limit: limit,
        })
      );
    }
  }

  useEffect(() => {
    if (firstLoad && data?.allMeetings) {
      dispatch(hydrateMeetings(data.allMeetings));
      setFirstLoad(false);
    } else if (data?.allMeetings) {
      dispatch(
        appendNewMonthOfReadings({
          ...data.allMeetings,
        })
      );
    }
  }, [data?.allMeetings.meetings]);

  const meetingsToRender = meetingsFromStore.meetings.filter((meeting) =>
    getMeetingsBetweenCursors(meeting)
  );

  return (
    <div className="flex flex-row justify-between items-center gap-1 ">
      <button
        aria-label="view previous month's meetings"
        onClick={handlePrevious}
        disabled={!moreOlderMeetings}
        className={`${moreOlderMeetings ? "" : "cursor-not-allowed"}`}
      >
        <ChevronLeftIcon
          className={`${
            moreOlderMeetings ? "text-regBlue" : "text-darkAccent"
          } h-7 w-7`}
        />
      </button>

      <div className="flex flex-row-reverse w-full justify-center items-center gap-1 px-2">
        {meetingsToRender.map((meeting) => {
          return <MeetingIndicator thisMeeting={meeting} key={meeting.id} />;
        })}

        {/* // TODO: Create loading state while fetching = true -> map an array that is the length of the limit of skeleton indicators  */}
      </div>
      {!moreNewerMeetings ? (
        <AddMeetingButton />
      ) : (
        <button
          aria-label="view next month's meetings"
          onClick={handleNext}
          disabled={!moreNewerMeetings}
          className={`${moreNewerMeetings ? "" : "cursor-not-allowed"}`}
        >
          <ChevronRightIcon
            className={`${
              moreNewerMeetings ? "text-regBlue" : "text-darkAccent"
            } h-7 w-7`}
          />
        </button>
      )}
    </div>
  );
};
