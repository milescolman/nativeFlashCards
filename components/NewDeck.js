import React, { Component } from 'react';
import { StyleSheet, Dimensions, TextInput, TouchableOpacity, View, Text, DeviceEventEmitter } from 'react-native'

import { saveDeckTitle } from '../utils/storageAPI'

export default class NewDeck extends Component {
  constructor (props) {
    super(props)
    this.state = { text: '',}
  }

  render () {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
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
    const { goBack } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40, textAlign: 'center'}}>
          What is the title of your new deck?
        </Text>
        <TextInput
          style={{padding: 10, borderRadius: 10, borderWidth: 2, width: Dimensions.get('window').width * 0.9}}
          placeholder='Deck Title'
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TouchableOpacity
          onPress={() => {
            saveDeckTitle(this.state.text)
            DeviceEventEmitter.emit('deck list refresh', {})
            goBack()
          }}
          style={[styles.button, {backgroundColor: 'black'}]}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
