import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/base';

import { auth } from '@/util/firebase';

export default function Welcome() {
    const { top } = useSafeAreaInsets();

    function handleLogoutUser() {
        auth.signOut();
    }

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <Text h2 style={styles.text}>
                Welcome Back!
            </Text>
            <View style={styles.content}>
                <Text style={styles.text}>Good to see you again.</Text>
                <Button
                    title='Logout'
                    color='primary'
                    containerStyle={styles.button}
                    onPress={handleLogoutUser}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        gap: 14,
    },
    content: {
        alignItems: 'center',
    },
    text: {
        marginBottom: 6,
        textAlign: 'center',
    },
    button: {
        width: 200,
        maxWidth: '80%',
    },
});
