import { LinearGradient } from 'expo-linear-gradient';
import type { ViewStyle } from 'react-native';

type ScreenHeaderProps = {
    style?: ViewStyle;
    children?: React.ReactNode;
};

export default function ScreenHeader({ style, children }: ScreenHeaderProps) {
    return (
        <LinearGradient
            colors={['#4639ff', '#1367f9']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.35 }}
            style={[{ flex: 1 }, style]}
            children={children}
        />
    );
}
