import type { PayloadAction } from '@reduxjs/toolkit';
import type { User as FirebaseUser } from 'firebase/auth';

type User = Pick<FirebaseUser, 'email' | 'uid'>;

export type AuthState = {
    user: User | null;
    loading: boolean;
    error: null | string;
};

export type ThunkSignUpPayload = {
    email: string;
    password: string;
};

export type ThunkSignUpReturn = User;

export type ThunkLoginPayload = {
    email: string;
    password: string;
};

export type ThunkLoginReturn = User;

type ReducerSetUser = PayloadAction<User>;
type ReducerLogout = PayloadAction<void>;

export type AuthReducers = {
    setUser(state: AuthState, action: ReducerSetUser): void;
    logout(state: AuthState, action: ReducerLogout): void;
};
