import { useRef, useState, useEffect } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Animated,
    PanResponder,
    LayoutAnimation,
    UIManager,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

type DeckItem = { id: string | number };

type DeckProps<T extends DeckItem> = {
    data: T[];
    renderCard(card: T): JSX.Element;
    renderNoMoreCards?(onReset: () => void): JSX.Element;
    onSwipeLeft?(item: T): void;
    onSwipeRight?(item: T): void;
};

export default function Swipe<T extends DeckItem>({
    data,
    renderCard,
    onSwipeLeft = () => {},
    onSwipeRight = () => {},
    renderNoMoreCards = () => <></>,
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

    useEffect(() => {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }, []);

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
        positionRef.current.setValue({ x: 0, y: 0 });
        setCurrentIdx(ps => ps + 1);
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
        if (currentIdx >= data.length) {
            return renderNoMoreCards(() => {
                setCurrentIdx(0);
            });
        }

        return data
            .map((item, dataIdx) => {
                if (dataIdx < currentIdx) return null;
                if (dataIdx === currentIdx) {
                    return (
                        <Animated.View
                            key={item.id as string}
                            style={[getCardStyle(), styles.itemStyle]}
                            {...panRef.current.panHandlers}
                        >
                            {renderCard(item)}
                        </Animated.View>
                    );
                }
                return (
                    <Animated.View
                        key={item.id}
                        style={[
                            styles.itemStyle,
                            { top: 10 * (dataIdx - currentIdx) },
                        ]}
                    >
                        {renderCard(item)}
                    </Animated.View>
                );
            })
            .reverse();
    }

    return <View style={styles.container}>{renderCards()}</View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        position: 'absolute',
        width: '100%',
    },
});
