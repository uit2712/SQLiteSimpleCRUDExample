/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Keyboard
} from 'react-native';
import Hero from '../models/Hero';
import { createHero } from '../controllers/HeroController';

export default class CreateHeroView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            hero: new Hero(),
            disableButtonCreate: true,
            disableColor: '#f488f4',
            enableColor: '#800080',
            currentButtonColor: '#f488f4',
            event: this.props.event,
        };
    }

    componentWillMount() {
        if (!this.state.hero)
            return;

        if (''.includes(this.state.hero.heroName))
            this.setState({ disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    changeName = (name: string) => {
        let hero = this.state.hero;
        if (!hero)
            return;

        hero.heroName = name;
        if (''.includes(this.state.hero.heroName))
            this.setState({ hero, disableButtonCreate: true, currentButtonColor: this.state.disableColor });
        else this.setState({ hero, disableButtonCreate: false, currentButtonColor: this.state.enableColor });
    }

    createHero = () => {
        if (!this.state.hero)
            return;

        createHero(this.state.hero).then(({ result, message }) => {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            if (result) {
                this.setState({ hero: new Hero() });
                Keyboard.dismiss();
                if (this.state.event)
                    this.state.event.emit('onCreateHero');
            }
        });
    }

    render() {
        if (!this.state.hero)
            return <Text style={styles.generalFontSize}>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <Text style={[styles.generalFontSize, styles.text]}>Hero name:</Text>
                <TextInput
                    style={[styles.input, styles.generalFontSize]}
                    placeholder='Hero name...'
                    value={this.state.hero.heroName}
                    onChangeText={(text) => this.changeName(text)}
                    onSubmitEditing={this.createHero}
                />
                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: this.state.currentButtonColor }]}
                    onPress={this.createHero}>
                    <Text style={[styles.buttonText, styles.generalFontSize]}>Create</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row',
        width: '90%',
        height: '10%',
        marginTop: 10,
    },
    generalFontSize: {
        fontSize: 20,
    },
    input: {
        height: 50,
        width: '45%',
        borderBottomWidth: 1,
        borderBottomColor: '#800080',
        marginHorizontal: 5,
    },
    text: {
        width: '30%',
    },
    buttonContainer: {
        width: '25%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});