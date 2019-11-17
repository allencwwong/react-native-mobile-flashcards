import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Deck = (props) => {
    const { deck } = props;

    if (deck === undefined) {
        return <View style={styles.deckContainer} />;
    }
    return (
        <View style={styles.deckContainer}>
            <View>
                <Text style={styles.deckText}>{deck.title}</Text>
            </View>
            <View>
                <Text style={styles.cardText}>
                    {deck.questions.length} cards
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 120,
        minHeight: 140,
        borderWidth: 1,
        borderColor: '#aaa',
        backgroundColor: '#333',
        borderRadius: 25,
        marginBottom: 10,
    },
    deckText: {
        color: '#fff',
        fontSize: 24,
    },
    cardText: {
        fontSize: 20,
        color: '#fff',
    },
});

const mapStateToProps = (state, { id }) => {
    const deck = state[id];

    return {
        deck,
    };
};

export default connect(mapStateToProps)(Deck);
