import { LinearGradient } from 'expo-linear-gradient';

export default function ScreenHeader() {
    return (
        <LinearGradient
            colors={['#4639ff', '#1367f9']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.35 }}
            style={{ flex: 1 }}
        />
    );
}
