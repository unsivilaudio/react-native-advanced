import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import type { MainTabParamsList } from '@/types/main-tab-params-list';

import MapScreen from '@/screens/Map';
import DeckScreen from '@/screens/Deck';
import ReviewStack from '@/navigators/ReviewStack';
import ScreenHeader from '@/components/ui/ScreenHeader';

const Tabs = createBottomTabNavigator<MainTabParamsList>();

export default function MainTab() {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: '#ecedef',
                headerBackground: () => <ScreenHeader />,
                tabBarActiveTintColor: '#e9ecf0',
                tabBarInactiveTintColor: '#222a54',
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: -10,
                },
                tabBarStyle: {
                    backgroundColor: '#1367f9',
                    height: 75,
                    paddingBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name='Map'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='map' />
                    ),
                }}
                component={MapScreen}
            />
            <Tabs.Screen
                name='Deck'
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='list' />
                    ),
                }}
                component={DeckScreen}
            />
            <Tabs.Screen
                name='Jobs'
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='star' />
                    ),
                }}
                component={ReviewStack}
            />
        </Tabs.Navigator>
    );
}
