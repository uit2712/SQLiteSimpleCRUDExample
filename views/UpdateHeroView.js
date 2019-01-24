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
} from 'react-native';
import Hero from '../models/Hero';
import { updateHero } from '../controllers/HeroController';

export default class UpdateHeroView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        let hero, event;
        if (this.props.navigation
            && this.props.navigation.state
            && this.props.navigation.state.params) {
                hero = this.props.navigation.state.params.hero;
                event = this.props.navigation.state.params.event;
            }

        this.state = {
            hero: hero,
            disableButtonCreate: true,
            disableColor: '#f488f4',
            enableColor: '#800080',
            currentButtonColor: '#f488f4',
            event: event,
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

    updateHero = () => {
        if (!this.state.hero)
            return;

        updateHero(this.state.hero).then(({ result, message }) => {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            if (result) {
                if (this.state.event)
                    this.state.event.emit('onUpdateHero');
            }
        });
    }

    render() {
        if (!this.state.hero)
            return <Text style={styles.generalFontSize}>Invalid hero!</Text>

        return (
            <View style={styles.container}>
                <View style={styles.infoContainer}>
                    <Text style={[styles.generalFontSize, styles.text]}>Hero name:</Text>
                    <TextInput
                        style={[styles.input, styles.generalFontSize]}
                        placeholder='Hero name...'
                        value={this.state.hero.heroName}
                        onChangeText={(text) => this.changeName(text)}
                        onSubmitEditing={this.updateHero}
                    />
                </View>
                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: this.state.currentButtonColor }]}
                    onPress={this.updateHero}>
                    <Text style={[styles.buttonText, styles.generalFontSize]}>Update</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        alignSelf: 'center',
        width: '90%',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    generalFontSize: {
        fontSize: 20,
    },
    input: {
        height: 50,
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: '#800080',
        marginHorizontal: 5,
    },
    text: {
        width: '30%',
    },
    buttonContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});