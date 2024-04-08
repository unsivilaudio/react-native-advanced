import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamsList } from '@/types/main-tab-params-list';
import type { ReviewStackParamsList } from '@/types/review-stack-params-list';

import ReviewScreen from '@/screens/Review';
import SettingsScreen from '@/screens/Settings';

const Stack = createNativeStackNavigator<ReviewStackParamsList>();

type ReviewStackProps = BottomTabScreenProps<MainTabParamsList, 'Jobs'>;

export default function ReviewStack({ navigation }: ReviewStackProps) {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'fade',
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
            }}
        >
            <Stack.Screen
                name='Review'
                component={ReviewScreen}
                listeners={{
                    focus() {
                        navigation.setOptions({
                            headerTitle: 'Review Jobs',
                            headerLeft: undefined,
                            headerRight: () => (
                                <Ionicons
                                    onPress={() =>
                                        navigation.navigate('Jobs', {
                                            screen: 'Settings',
                                        })
                                    }
                                    color='#ecedef'
                                    size={24}
                                    name='options'
                                />
                            ),
                        });
                    },
                }}
            />
            <Stack.Screen
                name='Settings'
                component={SettingsScreen}
                listeners={{
                    focus() {
                        navigation.setOptions({
                            headerTitle: 'Your Settings',
                            headerLeft: () => (
                                <Ionicons
                                    onPress={() =>
                                        navigation.navigate('Jobs', {
                                            screen: 'Review',
                                        })
                                    }
                                    color='#ecedef'
                                    size={24}
                                    name='arrow-back'
                                />
                            ),
                            headerRight: undefined,
                        });
                    },
                }}
            />
        </Stack.Navigator>
    );
}
