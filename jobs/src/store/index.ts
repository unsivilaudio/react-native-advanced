import { configureStore } from '@reduxjs/toolkit';

import auth from '@/store/slices/auth';
import jobs from '@/store/slices/jobs';

const store = configureStore({
    reducer: {
        auth,
        jobs,
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export default store;
