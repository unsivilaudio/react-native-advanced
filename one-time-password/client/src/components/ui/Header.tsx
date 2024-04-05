import type { ReactElement } from 'react';
import { Header as RNHeader } from '@rneui/base';
import { LinearGradient } from 'expo-linear-gradient';

type HeaderProps = {
    children: ReactElement;
    leftComponent?: ReactElement;
    rightComponent?: ReactElement;
};

export default function Header({
    children,
    leftComponent,
    rightComponent,
}: HeaderProps) {
    return (
        <RNHeader
            statusBarProps={{ backgroundColor: 'transparent' }}
            ViewComponent={LinearGradient}
            linearGradientProps={{
                colors: ['#3384ee', '#1672ec'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
            }}
            centerComponent={children}
            leftComponent={leftComponent}
            rightComponent={rightComponent}
        />
    );
}
