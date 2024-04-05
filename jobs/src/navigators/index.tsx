import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import RootTab from '@/navigators/RootTab';

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: '#ededed' }}>
                <RootTab />
            </View>
        </NavigationContainer>
    );
}
