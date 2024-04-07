import SwipeableListings from '@/components/listings/SwipeableListings';
import { useJobsStore } from '@/store/hooks/use-jobs';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function DeckScreen() {
    const { jobs, loading, error } = useJobsStore();

    let content = (
        <View style={[styles.container, styles.centerContainer]}>
            <ActivityIndicator size={40} color='black' />
        </View>
    );

    if (!loading && jobs.length) {
        content = (
            <View style={[styles.container, styles.centerContainer]}>
                <Text>
                    No results here yet...go back to the Map screen and search a
                    new location
                </Text>
            </View>
        );
    }

    if (!loading && jobs.length) {
        content = <SwipeableListings jobs={jobs} />;
    }

    if (error) {
        content = (
            <View style={[styles.container, styles.centerContainer]}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        paddingHorizontal: 20,
                        color: 'red',
                    }}
                >
                    {error}
                </Text>
            </View>
        );
    }

    return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#585b5c',
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
