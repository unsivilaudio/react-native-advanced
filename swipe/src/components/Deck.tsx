import { View, Text, StyleSheet, Animated } from 'react-native';

type DeckProps = {
    data: unknown[];
    renderCard(card: unknown): JSX.Element;
    renderNoMoreCards?(): JSX.Element;
    onSwipeLeft?(): void;
    onSwipeRight?(): void;
};

export default function Deck({ data, renderCard }: DeckProps) {
    function renderCards() {
        return data.map(item => renderCard(item));
    }

    return <View>{renderCards()}</View>;
}

const styles = StyleSheet.create({});
