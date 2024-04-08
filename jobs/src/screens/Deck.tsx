import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamsList } from '@/types/main-tab-params-list';

import { useJobsStore } from '@/store/hooks/use-jobs';
import { useAuthStore } from '@/store/hooks/use-auth';

import Card from '@/components/ui/Card';
import SwipeableListings from '@/components/listings/SwipeableListings';
import Button from '@/components/ui/Button';

type DeckScreenProps = BottomTabScreenProps<MainTabParamsList, 'Deck'>;

export default function DeckScreen({ navigation }: DeckScreenProps) {
    const { user } = useAuthStore();
    const { jobs, loading, error, fetchLikedJobs } = useJobsStore();

    useEffect(() => {
        if (user?.uid) {
            fetchLikedJobs({ uid: user.uid });
        }
    }, [user]);

    let content = (
        <View style={[styles.container, styles.centerContainer]}>
            <ActivityIndicator size={40} color='black' />
        </View>
    );

    if (!loading && jobs.length === 0) {
        content = (
            <View style={styles.centerContainer}>
                <Card style={styles.noResultsContainer}>
                    <Text style={styles.noResults}>
                        No results here yet...go back to the Map screen and
                        search a new location
                    </Text>
                    <Button
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Map')}
                    >
                        <Ionicons
                            name='locate-outline'
                            size={24}
                            color='#ecedef'
                        />
                        <Text style={styles.buttonText}>Back To Map</Text>
                    </Button>
                </Card>
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
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsContainer: {
        flex: 0,
        paddingHorizontal: 40,
        paddingBottom: 20,
        height: undefined,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    noResults: {
        fontSize: 16,
        color: '#1f1f1f',
        textAlign: 'center',
    },
    buttonContainer: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ecedef',
    },
});
