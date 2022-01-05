import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AttendanceRecordUser } from "src/components/Meetings/Attendance/MeetingsAttendance";
import { Meeting } from "src/generated/graphql";
import { RootState } from "src/store";
import { dedup } from "src/utils/dedup";

interface MeetingPaginationResponse {
  meetings?: Meeting[] | null;
  previousCursor?: string | null;
  nextCursor?: string | null;
}

export interface RichMeeting extends Meeting {
  isFuture?: boolean;
  attendanceRecords?: AttendanceRecordUser[];
}

export interface MeetingsState {
  hydrated: boolean;
  meetings: RichMeeting[];
  selectedMeeting?: RichMeeting;
  previousCursor?: string | null;
  nextCursor?: string | null;
}

const initialState: MeetingsState = {
  hydrated: false,
  meetings: [],
  selectedMeeting: undefined,
};

function setIsFuture(meeting: Meeting) {
  // Add the isFuture variable into the Meeting Object
  if (new Date(parseInt(meeting.meetingDate)) > new Date(Date.now())) {
    return { ...meeting, isFuture: true };
  } else {
    return { ...meeting, isFuture: false };
  }
}

export const meetingSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    hydrateMeetings: (
      state,
      action: PayloadAction<MeetingPaginationResponse>
    ) => {
      console.log("hydrating Meetings...");
      const meetings: RichMeeting[] = dedup(action.payload.meetings)
        .sort((a: Meeting, b: Meeting) => {
          return parseInt(b.meetingDate) - parseInt(a.meetingDate);
        })
        .map((meeting: Meeting) => setIsFuture(meeting));

      state.meetings = meetings;
      state.hydrated = true;
      state.selectedMeeting =
        meetings.filter((meeting) => meeting.isFuture)[0] || meetings[0]; // Set to the first future meeting occuring

      state.previousCursor = action.payload.previousCursor;
      state.nextCursor = action.payload.nextCursor;
    },

    setSelectedMeeting: (state, action: PayloadAction<Meeting>) => {
      state.selectedMeeting = action.payload;
    },

    appendNewBatchOfReadings: (
      state,
      action: PayloadAction<MeetingPaginationResponse>
    ) => {
      if (action.payload.meetings) {
        const newMeetings: RichMeeting[] = action.payload.meetings
          .sort((a: Meeting, b: Meeting) => {
            return parseInt(b.meetingDate) - parseInt(a.meetingDate);
          })
          .map((meeting: Meeting) => setIsFuture(meeting));

        // Append new meetings and dedup jic theres a duplicate
        state.meetings = dedup([...state.meetings, ...newMeetings]).sort(
          (a: Meeting, b: Meeting) => {
            return parseInt(b.meetingDate) - parseInt(a.meetingDate);
          }
        );

        state.selectedMeeting = newMeetings[0];
        state.nextCursor = newMeetings[0].meetingDate;
        state.previousCursor = action.payload.previousCursor;
      }
    },

    addNewMeeting: (state, action: PayloadAction<RichMeeting>) => {
      console.log("adding Meeting");
      const meetingDate = `${Date.parse(action.payload.meetingDate)}`;
      const newMeeting = { ...action.payload, meetingDate: meetingDate };

      let updatedMeetings = state.meetings;
      updatedMeetings.push(newMeeting);

      console.log(newMeeting);

      state.meetings = updatedMeetings.sort((a: Meeting, b: Meeting) => {
        return parseInt(b.meetingDate) - parseInt(a.meetingDate);
      });
      state.selectedMeeting = state.meetings.filter(
        (m) => m.id === action.payload.id
      )[0];
    },

    paginationBackwards: (
      state,
      action: PayloadAction<{ cursor: string; limit: number }>
    ) => {
      const allMeetingsAfterCursor = state.meetings.filter(
        (m) => m.meetingDate < action.payload.cursor
      );
      const meetings = allMeetingsAfterCursor.slice(0, action.payload.limit);

      state.selectedMeeting = meetings[0];
      state.nextCursor = meetings[0].meetingDate;
      state.previousCursor =
        allMeetingsAfterCursor.length > meetings.length
          ? meetings[meetings.length - 1].meetingDate
          : null;
    },

    paginationForwards: (
      state,
      action: PayloadAction<{ cursor: string; limit: number }>
    ) => {
      const meetingsAfterCursor = state.meetings.filter(
        (m) => m.meetingDate > action.payload.cursor
      );

      const meetings = meetingsAfterCursor.slice(
        meetingsAfterCursor.length - action.payload.limit,
        meetingsAfterCursor.length
      );

      state.selectedMeeting = meetings[0];
      state.nextCursor =
        meetingsAfterCursor.length > meetings.length
          ? meetings[0].meetingDate
          : null;
      state.previousCursor = meetings[meetings.length - 1].meetingDate;
    },

    updateMeetingAttendance: (
      state,
      action: PayloadAction<{
        meetingId: number;
        attendanceRecord: AttendanceRecordUser;
      }>
    ) => {
      state.meetings = state.meetings.map((m) => {
        // If this is the meeting in
        if (m.id === action.payload.meetingId) {
          let newAttendanceRecords = m.attendanceRecords;

          if (!newAttendanceRecords) {
            newAttendanceRecords = [];
          }
          const index = m.attendanceRecords?.findIndex(
            (e) => e.user.id === action.payload.attendanceRecord.user.id
          );
          if (index == null || index == undefined) {
            console.log("called");
            newAttendanceRecords = [action.payload.attendanceRecord];
          } else if (index === -1) {
            newAttendanceRecords.push(action.payload.attendanceRecord);
          } else {
            newAttendanceRecords[index] = action.payload.attendanceRecord;
          }
          return { ...m, attendanceRecords: newAttendanceRecords };
        } else {
          return m;
        }
      });

      state.selectedMeeting = state.meetings.filter(
        (m) => m.id === action.payload.meetingId
      )[0];
      // console.log(JSON.stringify(state.meetings));
    },

    hydrateMeetingAttendance: (
      state,
      action: PayloadAction<{
        meetingId: number;
        attendanceRecords: AttendanceRecordUser[];
      }>
    ) => {
      state.meetings = state.meetings.map((m) => {
        if (m.id === action.payload.meetingId) {
          return { ...m, attendanceRecords: action.payload.attendanceRecords };
        } else {
          return m;
        }
      });

      state.selectedMeeting = state.meetings.filter(
        (m) => m.id === action.payload.meetingId
      )[0];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  hydrateMeetings,
  setSelectedMeeting,
  appendNewBatchOfReadings,
  addNewMeeting,
  paginationBackwards,
  paginationForwards,
  updateMeetingAttendance,
  hydrateMeetingAttendance,
} = meetingSlice.actions;

export default meetingSlice.reducer;

export function selectedMeeting(state: RootState) {
  return state.meetings.selectedMeeting;
}

export function selectMeetings(state: RootState) {
  return {
    hydrated: state.meetings.hydrated,
    meetings: state.meetings.meetings,
    next: state.meetings.nextCursor,
    previous: state.meetings.previousCursor,
  };
}
