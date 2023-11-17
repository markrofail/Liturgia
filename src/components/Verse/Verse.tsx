import { StyleSheet, Text, View } from "react-native";
import { MultiLingualText } from "../../types";

interface VerseProps {
    verse: MultiLingualText;
}

export const Verse = ({ verse: { english, arabic, coptic, coptic_english } }: VerseProps) => {
    return (
        <View style={styles.container}>
            {english && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{english}</Text>
                </View>
            )}
            {coptic && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{coptic}</Text>
                </View>
            )}
            {coptic_english && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{coptic_english}</Text>
                </View>
            )}
            {arabic && (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{arabic}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexShrink: 1,
        flexGrow: 1,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        color: "white",
    },
});
