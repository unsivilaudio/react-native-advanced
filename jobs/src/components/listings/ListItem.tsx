import { View, Text, StyleSheet, Dimensions } from 'react-native';

import type { Job } from '@/providers/jooble';

import { parseFormattedDate } from '@/util/date';
import Card from '@/components/ui/Card';

type ListItemProps = Job;

export default function ListItem({
    title,
    company,
    updated,
    location,
    snippet,
}: ListItemProps) {
    const formattedDate = parseFormattedDate(new Date(updated));
    const formattedSnippet = snippet
        .split(/\s\s+/g)
        .map(entry => entry.trim())
        .join('\r\n');
    // console.log(formattedSnippet);

    return (
        <Card style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsText}>{company}</Text>
                <Text style={styles.detailsText}>{location}</Text>
                <Text style={styles.detailsText}>{formattedDate}</Text>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.descriptionText}>{formattedSnippet}</Text>
            </View>
        </Card>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height * 0.5,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    detailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        gap: 12,
    },
    detailsText: {
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    descriptionContainer: {},
    descriptionText: {
        fontSize: 14,
        fontStyle: 'italic',
    },
});
