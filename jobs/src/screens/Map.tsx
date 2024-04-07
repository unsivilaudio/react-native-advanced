import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { type Region } from 'react-native-maps';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamsList } from '@/types/main-tab-params-list';

import { useJobsStore } from '@/store/hooks/use-jobs';
import LocationSearch from '@/components/map/LocationSearch';

const __INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

type MapScreenProps = BottomTabScreenProps<MainTabParamsList, 'Map'>;

export default function MapScreen({ navigation }: MapScreenProps) {
    const { fetchJobs } = useJobsStore();
    const [region, setRegion] = useState<Region>(__INITIAL_REGION);

    function handleChangeRegion(updatedRegion: Region) {
        setRegion(updatedRegion);
    }

    function handleSearchLocation() {
        fetchJobs(region);
        navigation.navigate('Deck');
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
                onRegionChange={handleChangeRegion}
            />
            <LocationSearch onSearchLocation={handleSearchLocation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
