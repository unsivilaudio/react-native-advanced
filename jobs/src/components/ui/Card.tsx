import { View, StyleSheet, Dimensions, type ViewStyle } from 'react-native';

type CardProps = {
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
};

export default function Card({ style, children }: CardProps) {
    return <View style={[styles.container, style]}>{children}</View>;
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#aaa',
        backgroundColor: '#f1eeee',
        borderRadius: 6,
        padding: 18,
        paddingBottom: 40,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 2,
        height: height * 0.5,
    },
});
