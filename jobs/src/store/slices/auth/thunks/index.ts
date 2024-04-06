import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAuth,
    createUserWithEmailAndPassword,
    type User,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

import type {
    ThunkLoginPayload,
    ThunkLoginReturn,
    ThunkSignUpPayload,
    ThunkSignUpReturn,
} from '@/store/slices/auth/types';
import { auth, db } from '@/providers/firebase';

export const signupUser = createAsyncThunk<
    ThunkSignUpReturn,
    ThunkSignUpPayload
>('auth/signup', async payload => {
    const authProvider = getAuth(auth.app);
    const { user } = await createUserWithEmailAndPassword(
        authProvider,
        payload.email,
        payload.password
    );
    await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        location: null,
    });
    return { uid: user.uid, email: user.email };
});

export const loginUser = createAsyncThunk<ThunkLoginReturn, ThunkLoginPayload>(
    'auth/login',
    async payload => {
        const authProvider = getAuth(auth.app);
        const { user } = await signInWithEmailAndPassword(
            authProvider,
            payload.email,
            payload.password
        );
        return { uid: user.uid, email: user.email };
    }
);
