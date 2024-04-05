import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type SlideItemProps = {
    slide: { text: string; color: string };
    isLastSlide: boolean;
};

export default function SlideItem({ slide, isLastSlide }: SlideItemProps) {
    const navigation = useNavigation();
    return (
        <View style={[styles.slideContainer, { backgroundColor: slide.color }]}>
            <Text style={styles.slideText}>{slide.text}</Text>
            {isLastSlide && (
                <View style={styles.buttonContainer}>
                    <Button
                        title='Lets go!'
                        onPress={() =>
                            navigation.navigate('Main', { screen: 'Map' })
                        }
                    />
                </View>
            )}
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    slideContainer: {
        width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    slideText: {
        color: '#ecedef',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 25,
        width: 200,
        maxWidth: '80%',
    },
});
