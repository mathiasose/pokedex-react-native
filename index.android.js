import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

import resources from './api';

const Pokemon = ({pokemon}) => (
  <Text>{pokemon.name}</Text>
);

const PokeList = ({pokemons}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(pokemons || []);

  return (
    <ListView dataSource={dataSource} renderRow={(pokemon) => <Pokemon pokemon={pokemon}/>} />
  );
}

export default class pokedex extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokeJson: undefined
    }
  }

  componentDidMount() {
    resources.pokemonList()
      .then((pokeJson) => {
        this.setState({pokeJson: pokeJson})
      })
      .catch((err) => console.error(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Pokedex Native!
        </Text>

        <PokeList pokemons={this.state.pokeJson && this.state.pokeJson.results}/>
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
