import { useState, useLayoutEffect } from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Image } from '@rneui/base';

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
                containerStyle={{ padding: 0, paddingBottom: 14 }}
            >
                <Card.Image
                    source={{ uri: item.uri }}
                    style={{ height: 300 }}
                />
                <View style={{ paddingHorizontal: 14 }}>
                    <Card.Title>{item.text}</Card.Title>
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

    return (
        <>
            <StatusBar />
            <View style={styles.container}>
                <Deck
                    data={data}
                    renderCard={renderCard}
                    onSwipeLeft={() => console.log('swiped left')}
                    onSwipeRight={() => console.log('swiped right!')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
