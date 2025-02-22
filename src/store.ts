import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import videosReducer from "./videos/videos.slice.ts";
import detailsReducer from "./details/details.slice.ts";
import globalReducer from "./global/global.slice.ts";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    videos: videosReducer,
    videoDetails: detailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
