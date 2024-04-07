import { RootTabParamsList } from '@/types/root-tab-params-list';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootTabParamsList {}
    }
}
