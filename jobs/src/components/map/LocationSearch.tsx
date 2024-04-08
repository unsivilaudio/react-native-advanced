import { Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/ui/Button';

type LocationSearchProps = {
    onSearchLocation(): void;
};

export default function LocationSearch({
    onSearchLocation,
}: LocationSearchProps) {
    return (
        <Button style={styles.buttonContainer} onPress={onSearchLocation}>
            <Ionicons name='search' size={20} color='white' />
            <Text style={styles.buttonText}>Search This Area</Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        height: 50,
        gap: 10,
        bottom: 15,
        left: 0,
        right: 0,
        marginHorizontal: 15,
    },
    buttonText: {
        color: '#eceeef',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
