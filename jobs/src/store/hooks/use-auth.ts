import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import type { RootStore } from '@/store';
import type { AuthState } from '@/store/slices/auth/types';
import { setUser, logout } from '@/store/slices/auth';
import { signupUser, loginUser } from '@/store/slices/auth/thunks';

export function useAuthStore() {
    const dispatch = useDispatch();
    const auth = useSelector<RootStore, AuthState>(store => store.auth);

    const actions = bindActionCreators(
        { setUser, logout, signupUser, loginUser },
        dispatch
    );

    return { ...auth, ...actions };
}
