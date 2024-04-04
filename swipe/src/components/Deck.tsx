import { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

type DeckProps = {
    data: unknown[];
    renderCard(card: unknown): JSX.Element;
    renderNoMoreCards?(): JSX.Element;
    onSwipeLeft?(): void;
    onSwipeRight?(): void;
};

export default function Deck({ data, renderCard }: DeckProps) {
    const positionRef = useRef(new Animated.ValueXY());
    const panRef = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                positionRef.current.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: () => {},
        })
    );

    function renderCards() {
        return data.map(item => renderCard(item));
    }

    return (
        <Animated.View
            style={positionRef.current.getLayout()}
            {...panRef.current.panHandlers}
        >
            {renderCards()}
        </Animated.View>
    );
}

const styles = StyleSheet.create({});
