import { RootStackParamList } from '@/types/root-stack-param-list';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
