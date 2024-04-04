import { useState, useLayoutEffect } from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar as RNStatusBar,
    Platform,
} from 'react-native';
import { Card, Button } from '@rneui/base';

import type { Card as ICard } from '@/models/Card';

import { generateUsers } from '@/data/dummy_data';
import Deck from '@/components/Deck';

registerRootComponent(App);

export default function App() {
    const [data, setData] = useState<ICard[]>([]);

    useLayoutEffect(() => {
        generateUsers().then(users => {
            setData(users);
        });
    }, []);

    function renderCard(item: ICard) {
        return (
            <Card
                key={item.id}
                containerStyle={[styles.cardContainer, styles.renderCard]}
            >
                <Card.Image
                    source={{ uri: item.uri }}
                    style={{ height: 300 }}
                />
                <View style={{ paddingHorizontal: 14 }}>
                    <Card.Title h3>{item.text}</Card.Title>
                    <Text style={{ marginBottom: 10 }}>
                        I can customize the Card further.
                    </Text>
                    <Button
                        icon={{ name: 'code', color: 'white' }}
                        color='#03a9f4'
                        title='View Now!'
                    />
                </View>
            </Card>
        );
    }

    function renderNoMoreCards(onReset: () => void) {
        return (
            <View style={styles.renderNoCard}>
                <Card.Title style={{ color: 'white' }} h1>
                    All Done!
                </Card.Title>
                <Text
                    style={{
                        marginBottom: 10,
                        fontStyle: 'italic',
                        color: 'white',
                    }}
                >
                    There's no more content here!
                </Text>
                <Button
                    color='#03a9f4'
                    title='Get more!'
                    titleStyle={{ paddingHorizontal: 10 }}
                    onPress={onReset}
                />
            </View>
        );
    }

    return (
        <>
            <StatusBar style='light' />
            <SafeAreaView style={styles.container}>
                <Deck
                    data={data}
                    renderCard={renderCard}
                    onSwipeLeft={() => console.log('swiped left')}
                    onSwipeRight={() => console.log('swiped right!')}
                    renderNoMoreCards={renderNoMoreCards}
                />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#43475b',
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
        paddingBottom: Platform.OS === 'android' ? 25 : 0,
    },
    cardContainer: {
        borderRadius: 6,
        overflow: 'hidden',
    },
    renderCard: {
        padding: 0,
        paddingBottom: 14,
    },
    renderNoCard: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
