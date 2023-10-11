import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobs } from "./jobApi";
import { JobType, PriorityEnum } from "../../types";

export interface JobsState {
  jobs: JobType[];
  status: "idle" | "loading" | "failed" | "NEED_TO_FETCH_DATA";
}

const initialState: JobsState = {
  jobs: [],
  status: "NEED_TO_FETCH_DATA",
};

export const fetchDataAsync = createAsyncThunk("api/data", async () => {
  const response = await fetchJobs();
  return response;
});

export const counterSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addJob: (
      state,
      action: PayloadAction<{ name: string; priority: PriorityEnum }>,
    ) => {
      const nextID = Math.max(...state.jobs.map((j) => j.id || 0)) + 1;
      state.jobs.push({
        id: nextID,
        ...action.payload,
      });
    },
    updateJobByID: (
      state,
      action: PayloadAction<{ id: number; priority: PriorityEnum }>,
    ) => {
      const item = state.jobs.find((j) => j.id === action.payload.id);
      if (!item) {
        return;
      }
      item.priority = action.payload.priority;
    },
    deleteJobByID: (state, action: PayloadAction<number>) => {
      const index = state.jobs.findIndex((j) => j.id === action.payload);
      state.jobs.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobs = action.payload;
      })
      .addCase(fetchDataAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addJob, updateJobByID, deleteJobByID } = counterSlice.actions;

export default counterSlice.reducer;
