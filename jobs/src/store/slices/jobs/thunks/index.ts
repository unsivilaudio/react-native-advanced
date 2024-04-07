import { createAsyncThunk } from '@reduxjs/toolkit';
import { reverseGeocode } from '@/providers/google';
import {
    doc,
    updateDoc,
    addDoc,
    collection,
    getDoc,
    deleteDoc,
    getDocs,
    query,
    where,
    documentId,
} from 'firebase/firestore';

import type {
    ThunkAddJobFavoritePayload,
    ThunkAddJobFavoriteReturn,
    ThunkFetchJobsPayload,
    ThunkFetchJobsReturn,
    ThunkRemoveJobFavoritePayload,
    ThunkRemoveJobFavoriteReturn,
    ThunkFetchFavoriteJobsPayload,
    ThunkFetchFavoriteJobsReturn,
} from '@/store/slices/jobs/types';

import { db } from '@/providers/firebase';
import { fetchJobsByLocation } from '@/providers/jooble';
import { FirestoreJob } from '@/types/firestore';

export const fetchJobs = createAsyncThunk<
    ThunkFetchJobsReturn,
    ThunkFetchJobsPayload
>('jobs/fetchJobs', async payload => {
    const results = await reverseGeocode(payload.latitude, payload.longitude);
    const state = results.address_components.find(r =>
        r.types.includes('administrative_area_level_1')
    )?.short_name;
    const city = results.address_components.find(r =>
        r.types.includes('locality')
    )?.long_name;
    if (!state || !city) {
        throw new Error('Failed to resolve location.');
    }
    const data = await fetchJobsByLocation(`${city},${state}`);
    return { totalCount: data.totalCount, jobs: data.jobs };
});

export const addLikedJob = createAsyncThunk<
    ThunkAddJobFavoriteReturn,
    ThunkAddJobFavoritePayload
>('jobs/likeJob', async payload => {
    const userDocRef = doc(collection(db, 'users'), payload.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
        throw new Error('Failed to retrieve user data.');
    }
    const favorites: string[] = userDoc.data()?.jobFavorites || [];
    const jobDocRef = await addDoc(collection(db, 'jobs'), payload.job);
    const updatedFavorites = [...new Set([...favorites, jobDocRef.id])];
    await updateDoc(userDocRef, {
        jobFavorites: updatedFavorites,
    });

    return { job: payload.job, docId: jobDocRef.id };
});

export const removeLikedJob = createAsyncThunk<
    ThunkRemoveJobFavoriteReturn,
    ThunkRemoveJobFavoritePayload
>('jobs/unlikeJob', async payload => {
    const jobDocRef = doc(collection(db, 'jobs'), payload.docId);
    const userDocRef = doc(collection(db, 'users'), payload.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
        throw new Error('Failed to retrieve user data.');
    }
    await deleteDoc(jobDocRef);
    const favorites: string[] =
        userDoc
            .data()
            ?.jobFavorites.filter((docId: string) => docId !== payload.docId) ||
        [];
    await updateDoc(userDocRef, {
        jobFavorites: favorites,
    });

    return { docId: payload.docId };
});

export const fetchLikedJobs = createAsyncThunk<
    ThunkFetchFavoriteJobsReturn,
    ThunkAddJobFavoritePayload
>('jobs/fetchLiked', async payload => {
    const userDocRef = doc(collection(db, 'users', payload.uid));
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
        throw new Error('Failed to retrieve user data.');
    }
    const userData = userDoc.data();
    let favorites: FirestoreJob[] = [];
    if (userData.jobFavorites.length) {
        const jobsRef = collection(db, 'jobs');
        const docsQuery = query(jobsRef, where(documentId(), 'in', favorites));
        await getDocs(docsQuery).then(
            snapshot =>
                (favorites = snapshot.docs.map(doc =>
                    doc.data()
                ) as FirestoreJob[])
        );
    }
    return favorites;
});
