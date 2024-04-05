import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/types/root-stack-param-list';
import type { AuthStackParamList } from '@/types/auth-stack-param-list';
import { auth } from '@/util/firebase';

import SignupScreen from '@/screens/Signup';
import LoginScreen from '@/screens/Login';
import Welcome from '@/screens/Welcome';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

preventAutoHideAsync();
registerRootComponent(App);

function NoAuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
    );
}

function AuthUserStack() {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name='Welcome' component={Welcome} />
        </AuthStack.Navigator>
    );
}

function RootNavigation() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(
            user => {
                if (user) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
                hideAsync();
            },
            err => {
                console.log(err.message);
                hideAsync();
            }
        );
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <AuthUserStack /> : <NoAuthStack />}
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
