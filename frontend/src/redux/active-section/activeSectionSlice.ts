import { RouteLabel } from "@/constants/routeItems";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ActiveSection = RouteLabel | undefined;

export type ActiveSectionState = {
  activeSection: ActiveSection;
};

const initialState: ActiveSectionState = {
  activeSection: undefined
};

const ActiveSectionSlice = createSlice({
  name: "ActiveSection",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<ActiveSection>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = ActiveSectionSlice.actions;

export default ActiveSectionSlice.reducer;