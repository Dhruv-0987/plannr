import { createSlice } from "@reduxjs/toolkit";
import { fetchAllEvents } from "./Effects";

const initialState = {
  allEvents: [],
  allEventsLoaded: null,
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.allEventsLoaded = false;
      })
      .addCase(fetchAllEvents.fulfilled, (state, action) => {
        state.allEventsLoaded = true;
        state.allEvents = action.payload;
      });
  },
});

export const selectAllEvents = (state) => state.event.allEvents;
export default eventSlice.reducer;
