import { useRef, useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Animated,
    PanResponder,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

type DeckItem = { id: string | number };

type DeckProps<T extends DeckItem> = {
    data: T[];
    renderCard(card: T): JSX.Element;
    renderNoMoreCards?(): JSX.Element;
    onSwipeLeft(item: T): void;
    onSwipeRight(item: T): void;
};

export default function Deck<T extends DeckItem>({
    data,
    renderCard,
    onSwipeLeft,
    onSwipeRight,
}: DeckProps<T>) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const positionRef = useRef(new Animated.ValueXY());
    const panRef = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                positionRef.current.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            },
        })
    );

    function forceSwipe(direction: 'right' | 'left') {
        const x =
            direction === 'right' ? SCREEN_WIDTH + 50 : -SCREEN_WIDTH - 50;
        Animated.timing(positionRef.current, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
        }).start(() => onSwipeComplete(direction));
    }

    function onSwipeComplete(direction: 'right' | 'left') {
        const item = data[currentIdx];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    }

    function resetPosition() {
        Animated.spring(positionRef.current, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    }

    function getCardStyle() {
        const position = positionRef.current;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg'],
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }],
        };
    }

    function renderCards() {
        return data.map((item, index) => {
            if (index === 0) {
                return (
                    <Animated.View
                        key={item.id as string}
                        style={getCardStyle()}
                        {...panRef.current.panHandlers}
                    >
                        {renderCard(item)}
                    </Animated.View>
                );
            }
            return renderCard(item);
        });
    }

    return <View>{renderCards()}</View>;
}

const styles = StyleSheet.create({});
