import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Deck extends Component {
  render ()  {

    return (
      <View>
        <View>
          <Text>{this.props.title}</Text>
          <Text>{this.props.cards.length} cards</Text>
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
