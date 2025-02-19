import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";

type FileInfo = {
  filename: string;
  completePath: string; 
}

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

function detectVideoFiles() {
  return  invoke("collect_video_files") as Promise<FileInfo[]>;
  // return getFilesFromFS({
  //   root: process.cwd(),
  //   extensions: VIDEO_EXTENSIONS,
  //   recursive: true,
  // });
}

export const getVideoFilesFromFS = createAsyncThunk(
  "videos/readFiles",
  detectVideoFiles
);

// Action creators are generated for each case reducer function
export const { setCurrentVideoIndex } = videosSlice.actions;

export default videosSlice.reducer;
