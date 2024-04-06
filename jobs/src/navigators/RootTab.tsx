import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import type { RootTabParamsList } from '@/types/root-tab-params-list';

import { useAuthStore } from '@/store/hooks/use-auth';
import WelcomeScreen from '@/screens/Welcome';
import AuthScreen from '@/screens/Auth';
import MainTab from '@/navigators/MainTab';

const Tabs = createBottomTabNavigator<RootTabParamsList>();

export default function RootTab() {
    const navigation = useNavigation();
    const { user } = useAuthStore();

    useEffect(() => {
        if (!user) {
            navigation.navigate('Auth');
        }
    }, [user, navigation]);

    return (
        <Tabs.Navigator
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}
            backBehavior='none'
        >
            <Tabs.Screen name='Auth' component={AuthScreen} />
            <Tabs.Screen name='Welcome' component={WelcomeScreen} />
            <Tabs.Screen name='Main' component={MainTab} />
        </Tabs.Navigator>
    );
}
