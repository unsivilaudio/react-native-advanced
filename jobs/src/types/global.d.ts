import { RootTabParamsList } from '@/types/root-tab-params-list';

declare module '@env' {
    export const GOOGLE_MAPS_API_KEY: string;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootTabParamsList {}
    }
}
