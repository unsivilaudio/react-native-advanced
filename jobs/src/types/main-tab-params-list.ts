import type { NavigatorScreenParams } from '@react-navigation/native';
import type { ReviewStackParamsList } from '@/types/review-stack-params-list';

export type MainTabParamsList = {
    Map: undefined;
    Deck: undefined;
    Jobs: NavigatorScreenParams<ReviewStackParamsList>;
};
