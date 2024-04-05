import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import { requestOTP, signUp } from '@/util/http';
import Header from '@/components/ui/Header';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupScreen() {
    const navigation = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleSwitchLogin() {
        navigation.navigate('Login');
    }

    async function handleSubmitForm(email: string, phone: string) {
        setIsSubmitting(true);
        try {
            await signUp(email, phone);
            await requestOTP(phone);
            navigation.navigate('Login');
        } catch (err) {
            console.log('Failed to create user.');
        }
        setIsSubmitting(false);
    }

    return (
        <View style={styles.container}>
            <Header>
                <Text style={styles.headerText}>Sign Up</Text>
            </Header>
            <SignupForm
                onSwitchLogin={handleSwitchLogin}
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
