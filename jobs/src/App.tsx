import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from '@/navigators';

registerRootComponent(App);

export default function App() {
    return (
        <>
            <StatusBar style='auto' />
            <SafeAreaProvider>
                <AppNavigation />
            </SafeAreaProvider>
        </>
    );
}
