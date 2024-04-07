import { Text, StyleSheet, Platform, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type LocationSearchProps = {
    onSearchLocation(): void;
};

export default function LocationSearch({
    onSearchLocation,
}: LocationSearchProps) {
    return (
        <Pressable
            onPress={onSearchLocation}
            android_ripple={{ color: '#1554c1' }}
            style={({ pressed }) => [
                styles.buttonContainer,
                Platform.OS === 'ios' &&
                    pressed && { backgroundColor: '#1554c1' },
            ]}
        >
            <Ionicons name='search' size={20} color='white' />
            <Text style={styles.buttonText}>Search This Area</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        bottom: 15,
        left: 0,
        right: 0,
        marginHorizontal: 15,
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: '#1367f9',
        borderRadius: 4,
        elevation: 4,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 1 },
        shadowOpacity: 0.7,
    },
    buttonText: {
        color: '#eceeef',
        fontSize: 18,
        fontWeight: '500',
    },
});
