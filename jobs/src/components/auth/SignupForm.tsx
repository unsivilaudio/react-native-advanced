import { useState } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SignupFormProps = {
    onSwitchAuth(): void;
    onSubmit(email: string, password: string): void;
    isSubmitting: boolean;
};

export default function SignupForm({
    onSwitchAuth,
    onSubmit,
    isSubmitting,
}: SignupFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit() {
        if (password.trim() !== confirmPassword.trim()) {
            Alert.alert('Passwords must match!');
            return;
        }

        onSubmit(email, password);
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.header}>Create A New Account</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.icon}>
                        <Ionicons name='person' size={30} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='your@test.com'
                        textContentType='emailAddress'
                        onChangeText={value => setEmail(value)}
                        value={email}
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.icon}>
                        <Ionicons name='key' size={30} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='password'
                        textContentType='password'
                        passwordRules='minlength: 5;'
                        onChangeText={value => setPassword(value)}
                        value={password}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={styles.icon}>
                        <Ionicons name='key' size={30} />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='confirm password'
                        textContentType='password'
                        passwordRules='minlength: 5;'
                        onChangeText={value => setConfirmPassword(value)}
                        value={confirmPassword}
                        autoCapitalize='none'
                        secureTextEntry
                    />
                </View>
                <View style={styles.actions}>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={
                                !isSubmitting
                                    ? 'Sign Up'
                                    : 'Creating account...'
                            }
                            onPress={handleSubmit}
                            disabled={isSubmitting}
                        />
                    </View>
                    <Pressable onPress={onSwitchAuth} disabled={isSubmitting}>
                        <Text style={styles.switchText}>
                            Already registered? Switch to login instead.
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    form: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
        paddingBottom: 20,
        gap: 14,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingHorizontal: 30,
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        alignSelf: 'center',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        flexBasis: 35,
        flexGrow: 0,
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 6,
        paddingHorizontal: 16,
    },
    actions: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    buttonContainer: {
        width: 200,
        maxWidth: '80%',
        marginBottom: 12,
    },
    switchText: {
        fontSize: 12,
        textAlign: 'center',
    },
});
