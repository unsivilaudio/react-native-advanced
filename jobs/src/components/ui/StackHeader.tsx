import { View, type ViewStyle } from 'react-native';

import ScreenHeader from '@/components/ui/ScreenHeader';

type StackHeaderProps = {
    style?: ViewStyle;
    children: React.ReactNode;
};

export default function StackHeader({ children, style }: StackHeaderProps) {
    return (
        <View style={style}>
            <ScreenHeader
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
            />
            {children}
        </View>
    );
}
