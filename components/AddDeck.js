import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import TouchButton from './buttons/TouchButton';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitle } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';

export class AddDeck extends Component {
    state = {
        text: '',
    };
    handleChange = (text) => {
        this.setState({ text });
    };
    handleSubmit = () => {
        const { addDeck, navigation } = this.props;
        const { text } = this.state;

        addDeck(text);
        saveDeckTitle(text);

        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({
                    routeName: 'DeckDetail',
                    params: { title: text },
                }),
            ],
        });
        navigation.dispatch(resetAction);

        this.setState(() => ({ text: '' }));
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={{ height: 60 }} />
                <View style={styles.block}>
                    <Text style={styles.title}>Deck title?</Text>
                </View>
                <View style={[styles.block]}>
                    <TextInput
                        style={styles.input}
                        value={this.state.text}
                        onChangeText={this.handleChange}
                        placeholder="Deck Name"
                        autoFocus={true}
                        returnKeyType="done"
                        onSubmitEditing={this.handleSubmit}
                    />
                </View>
                <TouchButton
                    btnStyle={{ backgroundColor: '#000', borderColor: '#fff' }}
                    onPress={this.handleSubmit}
                    disabled={this.state.text === ''}>
                    Create Deck
                </TouchButton>
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
    block: {
        marginBottom: 24,
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#fff',
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 4,
        fontSize: 24,
        height: 60,
        marginBottom: 20,
    },
});

export default connect(null, { addDeck })(AddDeck);
