import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { auth } from '@/util/firebase';
import Header from '@/components/ui/Header';
import LoginForm from '@/components/auth/LoginForm';
import { login } from '@/util/http';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSwitchSignup() {
        navigation.navigate('Signup');
    }

    async function handleSubmitForm(phone: string, code: string) {
        setIsSubmitting(true);
        try {
            const { token } = await login(phone, code);
            const authProvider = getAuth(auth.app);
            await signInWithCustomToken(authProvider, token);
        } catch (err: unknown) {
            console.log((err as Error).message);
            console.log('Failed to log user in.');
        }
        setIsSubmitting(false);
    }

    return (
        <View style={styles.container}>
            <Header>
                <Text style={styles.headerText}>Login</Text>
            </Header>
            <LoginForm
                onSwitchSignup={handleSwitchSignup}
                onSubmitForm={handleSubmitForm}
                isSubmitting={isSubmitting}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    container: {
        flex: 1,
    },
});
