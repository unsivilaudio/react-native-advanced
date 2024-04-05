import { Button, View, Text, StyleSheet } from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { RootTabParamsList } from '@/types/root-tab-params-list';
import Slides from '@/components/welcome/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03a9f4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03a9f4' },
];

type WelcomeScreenProps = BottomTabScreenProps<RootTabParamsList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
    return (
        <View style={styles.container}>
            <Slides slides={SLIDE_DATA} />
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
