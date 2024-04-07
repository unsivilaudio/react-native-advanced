import { View, Text, StyleSheet, Dimensions } from 'react-native';
import type { Job } from '@/providers/jooble';

type ListItemProps = Job;

export default function ListItem({
    title,
    company,
    updated,
    location,
    snippet,
}: ListItemProps) {
    const formattedDate = new Date(updated).toLocaleString();
    const formattedSnippet = snippet
        .split(/\s\s+/g)
        .map(entry => entry.trim())
        .join('\r\n');
    // console.log(formattedSnippet);

    return (
        <View style={styles.container}>
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
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#aaa',
        backgroundColor: '#f1eeee',
        borderRadius: 6,
        padding: 18,
        paddingBottom: 40,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: { width: 2, height: 1 },
        shadowRadius: 2,
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
