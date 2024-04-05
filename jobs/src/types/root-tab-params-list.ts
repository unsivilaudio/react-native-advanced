import type { NavigatorScreenParams } from '@react-navigation/native';
import type { MainTabParamsList } from '@/types/main-tab-params-list';

export type RootTabParamsList = {
    Auth: undefined;
    Welcome: undefined;
    Main: NavigatorScreenParams<MainTabParamsList>;
};
