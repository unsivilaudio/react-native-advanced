import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { ReviewStackParamsList } from '@/types/review-stack-params-list';
import ReviewScreen from '@/screens/Review';
import SettingsScreen from '@/screens/Settings';
import ScreenHeader from '@/components/ui/ScreenHeader';
import StackHeader from '@/components/ui/StackHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<ReviewStackParamsList>();

export default function ReviewStack() {
    const { top } = useSafeAreaInsets();
    return (
        <Stack.Navigator screenOptions={{ animation: 'fade' }}>
            <Stack.Screen
                name='Review'
                component={ReviewScreen}
                options={({ navigation }) => ({
                    title: 'Review Jobs',
                    header: ({ route }) => (
                        <StackHeader
                            style={{
                                height: 72 + top,
                                paddingTop: 40,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <View>
                                    <Text
                                        style={{
                                            color: '#ecedef',
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {route.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 10,
                                        top: 4,
                                    }}
                                >
                                    <Ionicons
                                        onPress={() =>
                                            navigation.navigate('Settings')
                                        }
                                        color='#ecedef'
                                        size={24}
                                        name='options'
                                    />
                                </View>
                            </View>
                        </StackHeader>
                    ),
                })}
            />
            <Stack.Screen
                name='Settings'
                component={SettingsScreen}
                options={({ navigation }) => ({
                    title: 'Review Jobs',
                    header: ({ route }) => (
                        <StackHeader
                            style={{
                                height: 72 + top,
                                paddingTop: 40,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <View>
                                    <Text
                                        style={{
                                            color: '#ecedef',
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {route.name}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 10,
                                        top: 4,
                                    }}
                                >
                                    <Ionicons
                                        onPress={() => navigation.goBack()}
                                        color='#ecedef'
                                        size={24}
                                        name='arrow-back'
                                    />
                                </View>
                            </View>
                        </StackHeader>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}
