import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function DeckTitle (props) {
  const styles = StyleSheet.create({
    title: {
      fontSize: 30
    },
    alignment: {
      alignItems: 'center'
    }
  })
  return (
    <View style={[styles.alignment]} 
      onClick={props.onClick}>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <Text style={{color: 'gray'}}>
        {props.cards.length} cards
      </Text>
    </View>
    )
}
