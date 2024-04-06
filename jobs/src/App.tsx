import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import '@/providers/firebase';
import store from '@/store';

import AppNavigation from '@/navigators';

registerRootComponent(App);
preventAutoHideAsync();

export default function App() {
    async function handleAuthReady() {
        await hideAsync();
    }

    return (
        <>
            <StatusBar style='light' />
            <SafeAreaProvider>
                <Provider store={store}>
                    <AppNavigation onAuthReady={handleAuthReady} />
                </Provider>
            </SafeAreaProvider>
        </>
    );
}
