import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { Job } from '@/providers/jooble';
import { useAuthStore } from '@/store/hooks/use-auth';
import { useJobsStore } from '@/store/hooks/use-jobs';

import Card from '@/components/ui/Card';
import ListItem from '@/components/listings/ListItem';
import Swipe from '@/components/ui/Swipe';

type SwipeableListingsProp = {
    jobs: Job[];
};

export default function SwipeableListings({ jobs }: SwipeableListingsProp) {
    const { user } = useAuthStore();
    const { addLikedJob, favorites } = useJobsStore();

    function handleSwipeRight(item: Job) {
        if (!favorites.find(job => job.id.toString() === item.id.toString())) {
            addLikedJob({ uid: user!.uid, job: item });
        }
    }

    function handleRenderNoMoreJobs() {
        return (
            <View style={[styles.container, { justifyContent: 'center' }]}>
                <Card style={styles.noMoreJobsContainer}>
                    <Ionicons name='alert-circle' size={45} />
                    <Text style={styles.noMoreJobsText}>
                        No more jobs to show you...navigate back to the map to
                        get more results.
                    </Text>
                </Card>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Swipe
                data={jobs}
                renderCard={item => <ListItem key={item.id} {...item} />}
                onSwipeRight={handleSwipeRight}
                renderNoMoreCards={handleRenderNoMoreJobs}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noMoreJobsContainer: {
        flex: 0,
        height: undefined,
        padding: 20,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    noMoreJobsText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
