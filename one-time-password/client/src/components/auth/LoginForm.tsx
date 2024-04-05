import { View, Text, StyleSheet } from 'react-native';

export default function LoginForm() {
    return (
        <View style={styles.container}>
            <Text>The LoginForm component</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
