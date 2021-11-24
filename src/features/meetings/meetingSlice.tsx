import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meeting } from "src/generated/graphql";
import { RootState } from "src/store";
import { dedup } from "src/utils/dedup";

export interface RichMeeting extends Meeting {
  isFuture?: boolean;
}

export interface previousReadingsState {
  meetings: RichMeeting[];
  selectedMeeting?: RichMeeting;
}

const initialState: previousReadingsState = {
  meetings: [],
  selectedMeeting: undefined,
};

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    hydrateMeetings: (state, action: PayloadAction<Meeting[]>) => {
      const meetings: RichMeeting[] = dedup(action.payload)
        .sort((a: Meeting, b: Meeting) => {
          return parseInt(a.meetingDate) - parseInt(b.meetingDate);
        })
        .map((meeting: Meeting) => {
          // Add the isFuture variable into the Meeting Object
          if (new Date(parseInt(meeting.meetingDate)) > new Date(Date.now())) {
            return { ...meeting, isFuture: true };
          } else {
            return { ...meeting, isFuture: false };
          }
        });

      state.meetings = meetings;
      state.selectedMeeting = meetings.filter((meeting) => meeting.isFuture)[0]; // Set to the first future meeting occuring
    },

    setSelectedMeeting: (state, action: PayloadAction<Meeting>) => {
      state.selectedMeeting = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hydrateMeetings, setSelectedMeeting } = meetingSlice.actions;

export default meetingSlice.reducer;

export function allMeetings(state: RootState) {
  return state.meetings.meetings;
}
export function selectedMeeting(state: RootState) {
  return state.meetings.selectedMeeting;
}
