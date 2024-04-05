import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '@/components/ui/Header';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginScreen() {
    const navigation = useNavigation();

    function handleSwitchLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Header>
                <Text style={styles.headerText}>Login</Text>
            </Header>
            <LoginForm />
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
