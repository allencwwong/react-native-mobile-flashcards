import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { handleInitData } from '../actions/index';

export class DeckList extends Component {
    componentDidMount() {
        this.props.handleInitData();
    }
    render() {
        const { decks, navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Mobile Flashcards</Text>
                {Object.values(decks).map((deck) => {
                    return (
                        <TouchableOpacity
                            key={deck.title}
                            onPress={() =>
                                navigation.navigate('DeckDetail', {
                                    title: deck.title,
                                })
                            }>
                            <Deck id={deck.title} />
                        </TouchableOpacity>
                    );
                })}
                <View style={{ marginBottom: 36 }} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#999',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
});

const mapStateToProps = (state) => ({ decks: state });

export default connect(mapStateToProps, { handleInitData })(DeckList);
