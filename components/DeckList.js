import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import DeckTitle from './DeckTitle'

class DeckList extends Component {
  static navigationOptions = {
    title: 'Welcome to DeckList',
    headerMode: 'none',
  }
  render () {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'stretch',
      }
    })
    let decks = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
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
