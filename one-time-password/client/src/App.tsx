import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/types/root-stack-param-list';
import SignupScreen from '@/screens/Signup';
import LoginScreen from '@/screens/Login';

const Stack = createNativeStackNavigator<RootStackParamList>();

registerRootComponent(App);

function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <SafeAreaProvider>
                <View style={styles.container}>
                    <RootNavigation />
                </View>
            </SafeAreaProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
