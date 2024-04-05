import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { ReviewStackParamsList } from '@/types/review-stack-params-list';
import ReviewScreen from '@/screens/Review';
import SettingsScreen from '@/screens/Settings';
import ScreenHeader from '@/components/ui/ScreenHeader';

const Stack = createNativeStackNavigator<ReviewStackParamsList>();

export default function ReviewStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name='Review'
                component={ReviewScreen}
                options={({ navigation }) => ({
                    title: 'Review Jobs',
                    headerTintColor: '#ecedef',
                    headerBackground: () => <ScreenHeader />,
                    headerRight: ({ tintColor }) => (
                        <Ionicons
                            onPress={() => navigation.navigate('Settings')}
                            color={tintColor}
                            size={24}
                            name='options'
                        />
                    ),
                })}
            />
            <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
    );
}
