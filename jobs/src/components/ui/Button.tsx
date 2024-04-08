import { Pressable, StyleSheet, type ViewStyle } from 'react-native';

type ButtonProps = {
    children: React.ReactNode;
    onPress(): void;
    style?: ViewStyle;
    color?: string;
    fadePress?: boolean;
};

export default function Button({
    children,
    style,
    onPress,
    color = '#1367f9',
    fadePress = true,
}: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.base,
                style,
                !!color && { backgroundColor: color },
                fadePress && pressed && { opacity: 0.7 },
            ]}
        >
            {children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#1367f9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
});
