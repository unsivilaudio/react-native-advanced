import { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

export default function Ball() {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 }));

    useEffect(() => {
        Animated.spring(position.current, {
            toValue: { x: 200, y: 500 },
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={position.current.getTranslateTransform()}>
            <View style={styles.ball}></View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    },
});
