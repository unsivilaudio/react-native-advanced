import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { RootTabParamsList } from '@/types/root-tab-params-list';

import WelcomeScreen from '@/screens/Welcome';
import AuthScreen from '@/screens/Auth';
import MainTab from '@/navigators/MainTab';

const Tabs = createBottomTabNavigator<RootTabParamsList>();

export default function RootTab() {
    return (
        <Tabs.Navigator
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { display: 'none' },
            }}
            backBehavior='none'
        >
            <Tabs.Screen name='Welcome' component={WelcomeScreen} />
            <Tabs.Screen name='Auth' component={AuthScreen} />
            <Tabs.Screen name='Main' component={MainTab} />
        </Tabs.Navigator>
    );
}
