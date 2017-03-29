import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import resources from './api';

export default class pokedex extends Component {
  constructor(props){
    super(props);
    this.state = {
        pokemons: undefined
    }
  }
  componentDidMount() {
    resources.pokemonList()
        .then((pokeJson) => {
            this.setState({pokemons: pokeJson})
        })
        .catch((err) => console.error(err))
  }
  render() {
      return (
         <View style={styles.container}>
           <Text style={styles.welcome}>
             Pokedex Native!
           </Text>
           <Text style={styles.instructions}>
             {this.state.pokemons && JSON.stringify(this.state.pokemons)}
           </Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('pokedex', () => pokedex);
