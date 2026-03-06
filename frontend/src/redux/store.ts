import { configureStore } from "@reduxjs/toolkit";
import activeSectionReducer from "@/redux/active-section/activeSectionSlice";

export const store = configureStore({
  reducer: {
    activeSection: activeSectionReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
