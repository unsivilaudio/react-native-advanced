import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';

import Header from '@/components/ui/Header';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupScreen() {
    const navigation = useNavigation();

    function handleSwitchLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Header>
                <Text style={styles.headerText}>Sign Up</Text>
            </Header>
            <SignupForm onSwitchLogin={handleSwitchLogin} />
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
