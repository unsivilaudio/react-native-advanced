import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import type { MainTabParamsList } from '@/types/main-tab-params-list';

import MapScreen from '@/screens/Map';
import DeckScreen from '@/screens/Deck';
import ReviewStack from '@/navigators/ReviewStack';
import ScreenHeader from '@/components/ui/ScreenHeader';
import { useAuthStore } from '@/store/hooks/use-auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tabs = createBottomTabNavigator<MainTabParamsList>();

export default function MainTab() {
    const { top } = useSafeAreaInsets();
    const { logout } = useAuthStore();

    return (
        <Tabs.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: '#ecedef',
                headerBackground: () => <ScreenHeader />,
                // headerStatusBarHeight: top,
                headerTitleStyle: { fontSize: 24 },
                headerLeftContainerStyle: { paddingLeft: 15 },
                headerRightContainerStyle: {
                    paddingTop: 2,
                    paddingRight: 15,
                },
                headerRight: ({ tintColor }) => (
                    <Ionicons
                        color={tintColor}
                        size={24}
                        name='exit-outline'
                        onPress={() => logout()}
                    />
                ),
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
                    title: 'Pick A Location',
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='map' />
                    ),
                }}
                component={MapScreen}
            />
            <Tabs.Screen
                name='Deck'
                options={{
                    title: 'Listings',
                    tabBarLabel: 'Listings',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='list' />
                    ),
                }}
                component={DeckScreen}
            />
            <Tabs.Screen
                name='Jobs'
                options={{
                    tabBarLabel: 'Favorites',
                    headerShown: true,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='star' />
                    ),
                }}
                component={ReviewStack}
            />
        </Tabs.Navigator>
    );
}
