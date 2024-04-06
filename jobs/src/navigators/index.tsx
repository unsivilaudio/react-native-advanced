import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { auth } from '@/providers/firebase';
import { useAuthStore } from '@/store/hooks/use-auth';
import RootTab from '@/navigators/RootTab';

type AppNavigationProps = {
    onAuthReady(): void;
};

export default function AppNavigation({ onAuthReady }: AppNavigationProps) {
    const { setUser } = useAuthStore();

    useEffect(() => {
        auth.onAuthStateChanged(
            user => {
                if (user) {
                    setUser({ uid: user.uid, email: user.email });
                }
                onAuthReady();
            },
            err => {
                console.log(err.message);
                onAuthReady();
            }
        );
    }, []);

    return (
        <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: '#ededed' }}>
                <RootTab />
            </View>
        </NavigationContainer>
    );
}
