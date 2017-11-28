import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'

export default class Quiz extends Component {
  state = {
    questionIdx: 0,
    status: 'showQuestion',
    showAnswer: false,
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    })
  }
  flipCard ()  {
    // this.setStrrate((state) => ({
    //   ...state,
    //   showAnswer: !state.showAnswer,
    // }))
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 800
      }).start()
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        duration: 800
      }).start()
    }

  }

  render () {
    const styles = StyleSheet.create({
      alignment: {
        flex: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
      },
      button: {
        borderRadius: 10,
        padding: 10,
        width: 150,
        alignItems: 'center',
        margin: 5,
      },
      flipCardBack: {
        position: 'absolute',
        top: 0
      },
      frontAnimatedStyle: {
        transform: [
          { rotateY: this.frontInterpolate}
        ],
        // opacity: this.frontOpacity,
      },
      backAnimatedStyle: {
        transform: [
          { rotateY: this.backInterpolate}
        ],
        // opacity: this.backOpacity
      }
    })
    const { navigate } = this.props.navigation
    const { state } = this.props.navigation

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Text>
            2 / 2 to be replaced with progress through quiz
          </Text>
        </View>
        <View style={[styles.alignment, ]}>
          <View>
            <Animated.View style={[styles.frontAnimatedStyle, {alignItems: 'center', backfaceVisibility: 'hidden', backgroundColor: 'white', opacity: this.frontOpacity,}]}>
              <Text style={{fontSize: 30, textAlign: 'center'}}>
                'The answer from the store'
              </Text>
              <TouchableOpacity
                onPress={() => this.flipCard()}
              >
                <Text style={{color: 'red'}}>
                  Question
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.backAnimatedStyle, styles.flipCardBack, {alignItems: 'center', backfaceVisibility: 'hidden', backgroundColor: 'white', opacity: this.backOpacity}]}>
              <Text style={{fontSize: 30, textAlign: 'center'}}>
                'The question from the store'
              </Text>
              <TouchableOpacity
                onPress={() => this.flipCard()}
              >
                <Text style={{color: 'red'}}>
                  Answer
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'green'}]}
              onPress={() =>
                this.setState((state) => ({
                  ...state,
                  questionIdx: state.questionIdx + 1
                }))
              }
            >
              <Text style={{color: 'white'}}>
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: 'red'}]}
            >
              <Text style={{color: 'white'}}>
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      )
    }
}
