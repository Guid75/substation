import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { invoke } from "@tauri-apps/api/core";

import { FileInfo } from "@/files/types";

export type VideoDetails = {
  externalSubtitleFiles: FileInfo[];
  internalSubtitles: unknown;
}

const initialState: VideoDetails = {
  externalSubtitleFiles: [],
  internalSubtitles: null
};

export const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      getDetailsForVideoFile.fulfilled,
      (_, action) => {
        return action.payload;
      }
    );
  },
});

export const getDetailsForVideoFile = createAsyncThunk(
  "details/read",
  (videoFilePath: string): Promise<VideoDetails> => {
    return invoke("get_video_file_details", { fileName: videoFilePath }) as Promise<VideoDetails>;
  }
);

export default detailsSlice.reducer;
