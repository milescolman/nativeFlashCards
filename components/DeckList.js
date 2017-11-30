import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, DeviceEventEmitter } from 'react-native'

import { getDecks } from '../utils/storageAPI'
import DeckTitle from './DeckTitle'

class DeckList extends Component {
  state = { decks: {}}

  static navigationOptions = {
    header: null,
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('deck list refresh', (e) => {
      this.refreshDecks()})
  }

  componentDidMount () {
    getDecks().then((decks) => this.setState({decks}))
  }

  refreshDecks () {
    getDecks().then((decks) => this.setState({decks}))
  }

  render () {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
      }
    })

    const decks = this.state.decks

    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        {Object.keys(decks).map(key => (
          <View
            style={{flex: 1, justifyContent: 'space-around', borderBottomWidth: 1}}
            key={key}
          >
            <TouchableOpacity
              onPress={() =>
                (
                  navigate('Deck', {title: decks[key]['title'], questions: decks[key]['questions']})
                )}
            >
              <DeckTitle
                title={decks[key]['title']}
                cards={decks[key]['questions']}
              />
            </TouchableOpacity>
            </View>
        ))}
      </View>
        )}
}
export default DeckList
