import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Input, Button } from '@rneui/base';

type SignupFormProps = {
    onSwitchLogin(): void;
};

export default function SignupForm({ onSwitchLogin }: SignupFormProps) {
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Input
                        inputStyle={styles.input}
                        labelStyle={styles.inputLabel}
                        label='Enter Phone Number'
                        keyboardType='number-pad'
                    />
                    <Input
                        inputStyle={styles.input}
                        labelStyle={styles.inputLabel}
                        label='Enter Email'
                    />
                </View>
                <View style={styles.actions}>
                    <Button buttonStyle={styles.button} title='Submit' />
                    <Pressable onPress={onSwitchLogin}>
                        <Text style={styles.switchText}>Switch to login.</Text>
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
