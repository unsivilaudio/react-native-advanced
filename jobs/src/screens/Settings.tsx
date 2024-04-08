import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useJobsStore } from '@/store/hooks/use-jobs';
import { useAuthStore } from '@/store/hooks/use-auth';

import Button from '@/components/ui/Button';

export default function SettingsScreen() {
    const { user } = useAuthStore();
    const { resetLikedJobs, loading } = useJobsStore();

    return (
        <View style={styles.container}>
            <Button
                color='#e86b45'
                onPress={() => {
                    if (loading) return;
                    resetLikedJobs({ uid: user!.uid });
                }}
                style={styles.buttonContainer}
            >
                <Ionicons name='trash' color='#ecedef' size={24} />
                <Text style={styles.buttonText}>
                    {loading ? 'Deleting...' : 'Delete Forever!'}
                </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        gap: 12,
    },
    buttonText: {
        color: '#ecedef',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
