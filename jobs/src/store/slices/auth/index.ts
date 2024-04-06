import { createSlice, type SliceSelectors } from '@reduxjs/toolkit';

import type { AuthState, AuthReducers } from '@/store/slices/auth/types';
import { signupUser, loginUser } from '@/store/slices/auth/thunks';
import { auth } from '@/providers/firebase';

const authSlice = createSlice<
    AuthState,
    AuthReducers,
    'auth',
    SliceSelectors<AuthState>
>({
    name: 'auth',
    initialState: { user: null, error: null, loading: false },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
            auth.signOut();
        },
    },
    extraReducers(builder) {
        builder.addCase(signupUser.pending, (state, action) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message!;
            state.loading = false;
        });
        builder.addCase(loginUser.pending, (state, action) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log(action.error.message);
            state.error = action.error.message!;
            state.loading = false;
        });
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
