import { Button, View, Text, StyleSheet } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamsList } from '@/types/root-tab-params-list';

type AuthScreenProps = BottomTabScreenProps<RootTabParamsList, 'Auth'>;

export default function AuthScreen({ navigation }: AuthScreenProps) {
    return (
        <View style={styles.container}>
            <Text>The Auth screen</Text>
            <View style={styles.button}>
                <Button
                    title='Next'
                    onPress={() =>
                        navigation.navigate('Main', { screen: 'Map' })
                    }
                />
            </View>
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
