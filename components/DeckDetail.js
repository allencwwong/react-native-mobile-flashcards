import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import TouchButton from './buttons/TouchButton';
import TextButton from './buttons/TextButton';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeck as removeDeckAPI } from '../utils/api';

export class DeckDetail extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }
    handleDelete = (id) => {
        const { removeDeck, navigation } = this.props;

        removeDeck(id);
        removeDeckAPI(id);

        navigation.goBack();
    };
    render() {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <Deck id={deck.title} />
                <View>
                    <TouchButton
                        btnStyle={{
                            backgroundColor: '#fff',
                            borderColor: '#aaa',
                        }}
                        txtStyle={{ color: '#aaa' }}
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', {
                                title: deck.title,
                            })
                        }>
                        Add Card
                    </TouchButton>
                    <TouchButton
                        btnStyle={{
                            backgroundColor: '#000',
                            borderColor: '#fff',
                        }}
                        txtStyle={{ color: '#fff' }}
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', {
                                title: deck.title,
                            })
                        }>
                        Start Quiz
                    </TouchButton>
                </View>
                <TextButton
                    txtStyle={{ color: 'red' }}
                    onPress={() => this.handleDelete(deck.title)}>
                    Delete Deck
                </TextButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: '#999',
    },
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return {
        deck,
    };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
