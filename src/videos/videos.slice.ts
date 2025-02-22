import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";
import { FileInfo } from "@/files/types";

export interface VideoState {
  files: FileInfo[];
  currentVideoIndex?: number;
}

const initialState: VideoState = {
  files: [],
};

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setCurrentVideoIndex: (state, action: PayloadAction<number>) => {
      const nextIndex = action.payload;

      if (nextIndex <= state.files.length - 1) {
        state.currentVideoIndex = nextIndex;
      } else {
        delete state.currentVideoIndex;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoFilesFromFS.fulfilled, (state, action) => {
      state.files = action.payload;
      if (state.files.length > 0) {
        state.currentVideoIndex = 0;
      }
    });
  },
});

async function detectVideoFiles() {
  return invoke("collect_video_files") as Promise<FileInfo[]>;
}

export const getVideoFilesFromFS = createAsyncThunk(
  "videos/readFiles",
  detectVideoFiles
);

export const { setCurrentVideoIndex } = videosSlice.actions;

export default videosSlice.reducer;
