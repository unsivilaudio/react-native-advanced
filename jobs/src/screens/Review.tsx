import { View, ScrollView, Text, StyleSheet, Linking } from 'react-native';

import { getTimeElapsed } from '@/util/date';
import { useJobsStore } from '@/store/hooks/use-jobs';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ReviewScreen() {
    const { favorites } = useJobsStore();

    if (!favorites.length) {
        return (
            <View style={[styles.container, styles.noResultsContainer]}>
                <Card style={styles.noResults}>
                    <Text style={styles.noResultsText}>No saved jobs yet.</Text>
                </Card>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {favorites.map(job => (
                <Card key={job.docId} style={styles.reviewItemContainer}>
                    <View style={styles.cardHeader}>
                        <Text
                            style={[
                                styles.company,
                                styles.italics,
                                styles.bold,
                            ]}
                        >
                            {job.company}
                        </Text>
                        <Text style={styles.italics}>
                            {getTimeElapsed(new Date(job.updated))}
                        </Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.textDetails}>
                            <Text style={styles.bold}>Location:</Text>
                            <Text style={styles.italics}>{job.location}</Text>
                        </View>
                        <View style={styles.textDetails}>
                            <Text style={styles.bold}>Position:</Text>
                            <Text style={styles.italics}>{job.title}</Text>
                        </View>
                        <View style={styles.textDetails}>
                            <Text style={styles.bold}>Type:</Text>
                            <Text style={styles.italics}>
                                {job.type || 'N/A'}
                            </Text>
                        </View>
                    </View>
                    <Button
                        color='#3392ad'
                        style={styles.buttonContainer}
                        onPress={() => Linking.openURL(job.link)}
                    >
                        <Text style={styles.buttonText}>Apply Now!</Text>
                    </Button>
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingVertical: 30,
        paddingHorizontal: 25,
        gap: 25,
    },
    noResultsContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResults: {
        width: '100%',
        flex: 0,
        padding: 40,
        paddingBottom: undefined,
        height: undefined,
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    reviewItemContainer: {
        height: 200,
        paddingHorizontal: 30,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    company: {
        fontSize: 16,
    },
    detailsContainer: {
        marginVertical: 10,
    },
    textDetails: {
        flexDirection: 'row',
        gap: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    italics: {
        fontStyle: 'italic',
    },
    buttonContainer: {
        elevation: 4,
    },
    buttonText: {
        color: '#ecedef',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
