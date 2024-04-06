import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamsList } from '@/types/root-tab-params-list';

import { useAuthStore } from '@/store/hooks/use-auth';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

type AuthScreenProps = BottomTabScreenProps<RootTabParamsList, 'Auth'>;

export default function AuthScreen({ navigation }: AuthScreenProps) {
    const { signupUser, loginUser, loading, error, user } = useAuthStore();
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (user && !isLogin) {
            navigation.navigate('Welcome');
        } else if (user) {
            navigation.navigate('Main', { screen: 'Map' });
        }
    }, [isLogin, user]);

    function handleSwitchAuth() {
        setIsLogin(ps => !ps);
    }

    async function handleAuthSubmit(email: string, password: string) {
        if (isLogin) {
            loginUser({ email, password });
            return;
        }

        signupUser({ email, password });
    }

    return (
        <View style={styles.container}>
            {isLogin ? (
                <LoginForm
                    onSubmit={handleAuthSubmit}
                    onSwitchAuth={handleSwitchAuth}
                    isSubmitting={loading}
                />
            ) : (
                <SignupForm
                    onSubmit={handleAuthSubmit}
                    onSwitchAuth={handleSwitchAuth}
                    isSubmitting={loading}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    button: {
        width: 200,
        maxWidth: '80%',
    },
});
