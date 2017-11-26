import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render ()  {
    const { state } = this.props.navigation
    return (
      <View>
        <View>
          <Text>{state.params.title}</Text>
          <Text>{state.params.questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Deck
