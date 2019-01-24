import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeView from '../views/HomeView';
import UpdateHeroView from '../views/UpdateHeroView';
import React, { Component } from 'react';

const StackHero = createStackNavigator({
    Home: { screen: HomeView },
    UpdateHero: { screen: UpdateHeroView },
});

const StackHeroContainer = createAppContainer(StackHero);

export default class App extends Component<Props> {
    render() {
        return <StackHeroContainer/>
    }
}