import ListItem from '@/components/listings/ListItem';
import Swipe from '@/components/ui/Swipe';
import { Job } from '@/providers/jooble';
import { useAuthStore } from '@/store/hooks/use-auth';
import { useJobsStore } from '@/store/hooks/use-jobs';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';

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

    return (
        <View style={styles.container}>
            <Swipe
                data={jobs}
                renderCard={item => <ListItem key={item.id} {...item} />}
                onSwipeRight={handleSwipeRight}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
