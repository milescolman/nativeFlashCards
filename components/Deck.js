import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

class Deck extends Component {
  render ()  {
    const styles = StyleSheet.create({
      title: {
        fontSize: 40
      },
      alignment: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      button: {
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
        margin: 5,
      }
    })

    const { state } = this.props.navigation
    return (
      <View style={styles.alignment}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{state.params.title}</Text>
          <Text style={{color: 'gray'}}>{state.params.questions.length} cards</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text>
              Add Card
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, {backgroundColor: '#000'}]}>
            <Text style={{color: '#fff'}}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
export default Deck
