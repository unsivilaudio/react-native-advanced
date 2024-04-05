import SlideItem from '@/components/welcome/SlideItem';
import { StyleSheet, ScrollView } from 'react-native';

type SlideProps = {
    slides: { text: string; color: string }[];
};

export default function Slides({ slides }: SlideProps) {
    return (
        <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
            {slides.map((slide, index) => (
                <SlideItem
                    key={slide.text}
                    slide={slide}
                    isLastSlide={slides.length === index + 1}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
