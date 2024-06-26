import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import type { RootStore } from '@/store';
import type { JobsState } from '@/store/slices/jobs/types';

import {
    fetchJobs,
    fetchLikedJobs,
    addLikedJob,
    removeLikedJob,
    resetLikedJobs,
} from '@/store/slices/jobs/thunks';

export function useJobsStore() {
    const dispatch = useDispatch();
    const store = useSelector<RootStore, JobsState>(store => store.jobs);

    if (!store) {
        throw new Error(
            'You must use this hook inside of a store <Provider> component.'
        );
    }

    const actions = bindActionCreators(
        {
            fetchJobs,
            fetchLikedJobs,
            addLikedJob,
            removeLikedJob,
            resetLikedJobs,
        },
        dispatch
    );

    return { ...store, ...actions };
}
