import ListItem from '@/components/listings/ListItem';
import Swipe from '@/components/ui/Swipe';
import { Job } from '@/providers/jooble';
import { useAuthStore } from '@/store/hooks/use-auth';
import { useJobsStore } from '@/store/hooks/use-jobs';
import { View, StyleSheet } from 'react-native';

type SwipeableListingsProp = {
    jobs: Job[];
};

export default function SwipeableListings({ jobs }: SwipeableListingsProp) {
    const { user } = useAuthStore();
    const { addLikedJob, favorites } = useJobsStore();

    return (
        <View style={styles.container}>
            <Swipe
                data={jobs}
                renderCard={item => <ListItem key={item.id} {...item} />}
                onSwipeRight={item => {
                    console.log(favorites.map(fav => fav.id));
                    console.log(item.id);
                    if (
                        !favorites.find(
                            job => job.id.toString() === item.id.toString()
                        )
                    ) {
                        addLikedJob({ uid: user!.uid, job: item });
                    }
                }}
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
