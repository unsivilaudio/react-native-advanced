import { type SliceSelectors, createSlice } from '@reduxjs/toolkit';

import type { Job } from '@/providers/jooble';
import type { FirestoreJob } from '@/types/firestore';
import type { JobsReducer, JobsState } from '@/store/slices/jobs/types';

import {
    addLikedJob,
    fetchJobs,
    fetchLikedJobs,
    removeLikedJob,
    resetLikedJobs,
} from '@/store/slices/jobs/thunks';

const jobsSlice = createSlice<
    JobsState,
    JobsReducer,
    'jobs',
    SliceSelectors<JobsState>
>({
    name: 'jobs',
    initialState: {
        jobs: [] as Job[],
        favorites: [] as FirestoreJob[],
        location: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchJobs.pending, state => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            state.jobs = action.payload.jobs;
            state.loading = false;
        });
        builder.addCase(fetchJobs.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error.message!;
            state.loading = false;
        });
        // Add liked job
        builder.addCase(addLikedJob.pending, state => {
            state.error = null;
        });
        builder.addCase(addLikedJob.fulfilled, (state, action) => {
            state.favorites.push({
                docId: action.payload.docId,
                ...action.payload.job,
            });
        });
        builder.addCase(addLikedJob.rejected, (state, action) => {
            state.error = action.error.message!;
        });
        // Remove liked jobs
        builder.addCase(removeLikedJob.fulfilled, (state, action) => {
            state.favorites = state.favorites.filter(
                job => job.docId !== action.payload.docId
            );
        });
        builder.addCase(removeLikedJob.rejected, (_state, action) => {
            console.log('Failed to remove liked job.');
            console.log(action.error.message);
        });
        // Fetch liked jobs from database
        builder.addCase(fetchLikedJobs.pending, state => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchLikedJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.favorites = action.payload;
        });
        builder.addCase(fetchLikedJobs.rejected, (state, action) => {
            console.log(action.error.message);
            state.loading = false;
            state.error = action.error.message!;
        });
        // Reset liked jobs
        builder.addCase(resetLikedJobs.pending, state => {
            state.loading = true;
        });
        builder.addCase(resetLikedJobs.fulfilled, (state, action) => {
            state.favorites = [];
            state.loading = false;
        });
        builder.addCase(resetLikedJobs.rejected, (state, action) => {
            console.log(action.error.message);
            state.loading = false;
        });
    },
});

export default jobsSlice.reducer;
