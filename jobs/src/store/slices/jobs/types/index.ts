import type { Region } from 'react-native-maps';
import type { Job, FetchedJobs } from '@/providers/jooble';
import type { FirestoreJob } from '@/types/firestore';

export type FavoriteJobs = Job &
    {
        docId: string;
    }[];

export type JobsState = {
    jobs: Job[];
    favorites: FirestoreJob[];
    location: Region | null;
    loading: boolean;
    error: null | string;
};

export type JobsReducer = {};

export type ThunkFetchJobsPayload = Region;

export type ThunkFetchJobsReturn = FetchedJobs;

export type ThunkAddJobFavoritePayload = {
    uid: string;
    job: Job;
};

export type ThunkAddJobFavoriteReturn = {
    docId: string;
    job: Job;
};

export type ThunkRemoveJobFavoritePayload = {
    uid: string;
    docId: string;
};

export type ThunkRemoveJobFavoriteReturn = {
    docId: string;
};

export type ThunkFetchFavoriteJobsPayload = {
    uid: string;
};

export type ThunkFetchFavoriteJobsReturn = FirestoreJob[];

export type ThunkResetJobFavoritesPayload = {
    uid: string;
};

export type ThunkResetJobFavoritesReturn = {
    favorites: [];
};
