import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input, Button } from '@rneui/base';

type LoginFormProps = {
    onSwitchSignup(): void;
    onSubmitForm(phone: string, code: string): void;
    isSubmitting: boolean;
};

export default function LoginForm({
    onSwitchSignup,
    onSubmitForm,
    isSubmitting,
}: LoginFormProps) {
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');

    async function handleSubmit() {
        onSubmitForm(phone, code);
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Input
                        inputStyle={styles.input}
                        labelStyle={styles.inputLabel}
                        label='Enter Phone Number'
                        keyboardType='number-pad'
                        onChangeText={value => setPhone(value)}
                        value={phone}
                        disabled={isSubmitting}
                    />
                    <Input
                        inputStyle={styles.input}
                        labelStyle={styles.inputLabel}
                        label='Enter OTP Code'
                        onChangeText={value => setCode(value)}
                        value={code}
                        disabled={isSubmitting}
                    />
                </View>
                <View style={styles.actions}>
                    <Button
                        buttonStyle={styles.button}
                        title={isSubmitting ? 'Logging In...' : 'Login'}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    />
                    <Pressable onPress={onSwitchSignup} disabled={isSubmitting}>
                        <Text style={styles.switchText}>
                            Switch to sign up.
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 25,
    },
    form: {
        height: '100%',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 4,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 0,
    },
    input: {
        width: '100%',
    },
    actions: {
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 200,
        maxWidth: '80%',
    },
    switchText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
