import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reading as ReadingFromServer } from "src/generated/graphql";
import { RootState } from "src/store";
import { updateCurrentReading } from "./currentReadingSlice";

export type UserVote = {
  id: number;
  rating: number;
};

interface Reading extends ReadingFromServer {
  userVote?: UserVote;
}

export interface previousReadingsState {
  inEditMode: boolean;
  previousReadings: Reading[];
  selectedPreviousReading: Reading[];
}

const initialState: previousReadingsState = {
  inEditMode: false,
  previousReadings: [],
  selectedPreviousReading: [],
};

export const previousReadingSlice = createSlice({
  name: "previousReadings",
  initialState,
  reducers: {
    hydrateReadings: (state, action: PayloadAction<Reading[]>) => {
      state.previousReadings = action.payload;
    },

    addReading: (state, action: PayloadAction<Reading>) => {
      state.previousReadings = [action.payload, ...state.previousReadings];
    },

    removeReading: (state, action: PayloadAction<number[]>) => {
      state.previousReadings = state.previousReadings.filter(
        (reading) => !action.payload.some((id) => id === reading.id)
      );
      state.selectedPreviousReading = [];
    },

    updatePreviousReading: (state, action: PayloadAction<Reading>) => {
      state.previousReadings = state.previousReadings.map((reading) => {
        if (reading.id === action.payload.id) {
          return action.payload;
        }
        return reading;
      });

      if (action.payload.currentlyReading) {
        state.previousReadings = state.previousReadings.filter(
          (reading) => reading.id !== action.payload.id
        );
      }
      state.selectedPreviousReading = [];
    },

    addUserVote: (
      state,
      action: PayloadAction<{
        userVote: UserVote;
        id: number;
        avgRating?: number | null;
      }>
    ) => {
      state.previousReadings = state.previousReadings.map((reading) => {
        if (reading.id === action.payload.id) {
          if (action.payload.avgRating && action.payload.avgRating != null) {
            return {
              ...reading,
              userVote: action.payload.userVote,
              avgRating: action.payload.avgRating,
            };
          }
          return {
            ...reading,
            userVote: action.payload.userVote,
          };
        }
        return reading;
      });
    },

    toggleSelectedReading: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>
    ) => {
      const id = parseInt(action.payload.id);
      if (!action.payload.checked) {
        // If the action is unchecking the box, remove the selected reading
        state.selectedPreviousReading = state.selectedPreviousReading.filter(
          (reading) => reading.id !== id
        );
      } else {
        // if the reading object is not in the list

        // Add it to the selected previousReadings
        state.selectedPreviousReading = [
          ...state.selectedPreviousReading,
          ...state.previousReadings.filter((reading) => reading.id === id),
        ];
      }
    },

    toggleEditMode: (state) => {
      if (state.inEditMode) {
        // If the user is exiting edit mode, clear the selected previousReadings
        state.selectedPreviousReading = [];
      }
      state.inEditMode = !state.inEditMode;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(updateCurrentReading, (state, action) => {
    //   if (!action.payload.currentlyReading) {
    //     state.previousReadings = [action.payload, ...state.previousReadings];
    //   }
    // });
  },
});

// Action creators are generated for each case reducer function
export const {
  hydrateReadings,
  updatePreviousReading,
  addReading,
  addUserVote,
  removeReading,
  toggleEditMode,
  toggleSelectedReading,
} = previousReadingSlice.actions;

export default previousReadingSlice.reducer;

export function selectedPreviousReading(state: RootState) {
  return state.previousReadings.selectedPreviousReading;
}

export function inEditMode(state: RootState) {
  return state.previousReadings.inEditMode;
}

export function allPreviousReadings(state: RootState) {
  return state.previousReadings.previousReadings;
}
