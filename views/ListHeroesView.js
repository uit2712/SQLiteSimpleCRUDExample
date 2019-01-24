/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import Hero from '../models/Hero';
import HeroView from './HeroView';

export default class ListHeroesView extends Component<Props> {

    constructor(props: Props) {
        super(props);

        this.state = {
            heroes: this.props.heroes,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ heroes: nextProps.heroes });
    }

    renderListHeroes = () => {
        let result;
        result = this.state.heroes.map((hero: any) => {
            if (hero) {
                let h = new Hero(hero['heroId'], hero['heroName']);
                return <HeroView key={h.heroId} hero={h} event={this.props.event} />
            }
        });
        return result;
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderListHeroes()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        width: '100%',
        marginTop: 10,
    },
});