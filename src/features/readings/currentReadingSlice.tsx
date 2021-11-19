import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reading } from "src/generated/graphql";
import { RootState } from "src/store";
import { updatePreviousReading } from "./previousReadingSlice";

export interface currentReadingsState {
  inEditMode: boolean;
  currentReadings: Reading[];
  selectedCurrentReadings: Reading[];
}

const initialState: currentReadingsState = {
  inEditMode: false,
  currentReadings: [],
  selectedCurrentReadings: [],
};

export const currentReadingSlice = createSlice({
  name: "currentReadings",
  initialState,
  reducers: {
    hydrateReadings: (state, action: PayloadAction<Reading[]>) => {
      state.currentReadings = action.payload.filter(
        (reading) => reading.currentlyReading
      );
    },

    addReading: (state, action: PayloadAction<Reading>) => {
      state.currentReadings = [...state.currentReadings, action.payload];
    },

    removeReading: (state, action: PayloadAction<number[]>) => {
      state.currentReadings = state.currentReadings.filter(
        (reading) => !action.payload.some((id) => id === reading.id)
      );
      state.selectedCurrentReadings = [];
    },

    updateCurrentReading: (state, action: PayloadAction<Reading>) => {
      state.currentReadings = state.currentReadings.map((reading) => {
        if (reading.id === action.payload.id) {
          return action.payload;
        }
        return reading;
      });

      if (!action.payload.currentlyReading) {
        state.currentReadings = state.currentReadings.filter(
          (reading) => reading.id !== action.payload.id
        );
        // state.historicalReadings = [
        //   ...state.historicalReadings,
        //   action.payload,
        // ];
        // TODO: HANDLE ADDING READING INTO PREVIOUS READINGS
      }
      state.selectedCurrentReadings = [];
    },

    toggleSelectedReading: (
      state,
      action: PayloadAction<{ id: string; checked: boolean }>
    ) => {
      const id = parseInt(action.payload.id);
      if (!action.payload.checked) {
        // If the action is unchecking the box, remove the selected reading
        state.selectedCurrentReadings = state.selectedCurrentReadings.filter(
          (reading) => reading.id !== id
        );
      } else {
        // if the reading object is not in the list

        // Add it to the selected currentReadings
        state.selectedCurrentReadings = [
          ...state.selectedCurrentReadings,
          ...state.currentReadings.filter((reading) => reading.id === id),
        ];
      }
    },

    toggleEditMode: (state) => {
      if (state.inEditMode) {
        // If the user is exiting edit mode, clear the selected currentReadings
        state.selectedCurrentReadings = [];
      }
      state.inEditMode = !state.inEditMode;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(updatePreviousReading, (state, action) => {
    //   if (action.payload.currentlyReading) {
    //     state.currentReadings = [...state.currentReadings, action.payload];
    //   }
    // });
  },
});

// Action creators are generated for each case reducer function
export const {
  hydrateReadings,
  updateCurrentReading,
  addReading,
  removeReading,
  toggleEditMode,
  toggleSelectedReading,
} = currentReadingSlice.actions;

export default currentReadingSlice.reducer;

export function selectedCurrentReadings(state: RootState) {
  return state.currentReadings.selectedCurrentReadings;
}

export function inEditMode(state: RootState) {
  return state.currentReadings.inEditMode;
}

export function allCurrentReadings(state: RootState) {
  return state.currentReadings.currentReadings;
}
