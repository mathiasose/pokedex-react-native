import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

import resources from './api';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonJson: undefined,
    }
  }

  componentDidMount() {
    fetch(this.props.url)
      .then((response) => response.json())
      .then((pokemonJson) => {
        this.setState({pokemonJson: pokemonJson})
      })
      .catch((err) => console.error(err))
  }

  render() {
    if (this.state.pokemonJson) {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
          <Image style={{ width: 40, height: 40, backgroundColor: 'transparent',}}
                 source={{uri: this.state.pokemonJson.sprites.front_default}} />
          <Image style={{ width: 40, height: 40, backgroundColor: 'transparent',}}
                 source={{uri: this.state.pokemonJson.sprites.front_shiny}} />
          <Text>{this.state.pokemonJson.name}</Text>
        </View>
      )
    } else {
      return null;
    }
  }
};

const PokeList = ({pokemons}) => {
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  const dataSource = ds.cloneWithRows(pokemons || []);

  return (
    <ListView dataSource={dataSource} renderRow={(pokemon) => <Pokemon url={pokemon.url} />} />
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
