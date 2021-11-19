import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reading } from "src/generated/graphql";
import { RootState } from "src/store";

export interface readingsState {
  inEditMode: boolean;
  allReadings: Reading[];

  currentReadings: Reading[];
  selectedCurrentReadings: Reading[];

  historicalReadings: Reading[];
}

const initialState: readingsState = {
  inEditMode: false,
  allReadings: [],
  currentReadings: [],
  selectedCurrentReadings: [],
  historicalReadings: [],
};

export const readingSlice = createSlice({
  name: "readings",
  initialState,
  reducers: {
    hydrateReadings: (state, action: PayloadAction<Reading[]>) => {
      state.currentReadings = action.payload.filter(
        (reading) => reading.currentlyReading
      );

      state.historicalReadings = action.payload.filter(
        (reading) => !reading.currentlyReading
      );
      state.allReadings = action.payload;
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

    updateReading: (state, action: PayloadAction<Reading>) => {
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
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const {
  hydrateReadings,
  updateReading,
  addReading,
  removeReading,
  toggleEditMode,
  toggleSelectedReading,
} = readingSlice.actions;

export default readingSlice.reducer;

export function selectedCurrentReadings(state: RootState) {
  return state.readings.selectedCurrentReadings;
}

export function inEditMode(state: RootState) {
  return state.readings.inEditMode;
}

export function allCurrentReadings(state: RootState) {
  return state.readings.currentReadings;
}

export function allReadings(state: RootState) {
  return state.readings.allReadings;
}

// const allReadingsA = createSelector(updateReading,
//   state => state.readings.allReadings,
// )
