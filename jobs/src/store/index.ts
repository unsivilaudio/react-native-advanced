import { configureStore } from '@reduxjs/toolkit';

import auth from '@/store/slices/auth';

const store = configureStore({
    reducer: {
        auth,
    },
});

export type RootStore = ReturnType<typeof store.getState>;
export default store;
