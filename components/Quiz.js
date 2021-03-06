import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { NavigationActions } from 'react-navigation'

import ScoreScreen from './ScoreScreen'
import { getDeck } from '../utils/storageAPI'

export default class Quiz extends Component {
  state = {
    deck: {questions: []},
    questionIdx: 0,
    scoreNumerator: 0,
  }

  listener = ({ value }) => {
    this.value = value
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.animatedValue.addListener(this.listener)
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

  componentDidMount() {
    const id = this.props.navigation.state.params.title
    getDeck(id).then(deck => this.setState({deck}))
  }

  componentWillUnmount() {
    this.animatedValue.removeListener(this.listener)
  }

  // flip card animation from https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native
  // opacity added separately since backfaceVisibility is for ios only
  flipCard ()  {
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

  getNext () {
    if (this.state.deck.questions.length <= (this.state.questionIdx + 1)){
      const score = this.state.scoreNumerator
      this.setState((state) => ({
          ...state,
          questionIdx: -1,
          scoreNumerator: 0,
        }
      ))
      this.props.navigation.navigate('ScoreScreen', {
        screenKey: this.props.navigation.state.key,
        title: 'Score',
        score: Math.floor(100 * score / this.state.deck.questions.length),
        deckID: this.props.navigation.state.params.title,
      })
    }
    this.setState((state) => ({...state, questionIdx: state.questionIdx + 1}))
    this.value = 0
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 0
    }).start()

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
        //position: 'absolute', //BUG: causes sideways position shifts
        top: 0,
      },
      frontAnimatedStyle: {
        transform: [
          { rotateY: this.frontInterpolate}
        ],
      },
      backAnimatedStyle: {
        transform: [
          { rotateY: this.backInterpolate}
        ],
      }
    })
    const { navigate } = this.props.navigation
    const { state } = this.props.navigation
    const question = !!this.state.deck.questions[0] && this.state.deck.questions[this.state.questionIdx] && this.state.deck.questions[this.state.questionIdx].question
    const answer = !!this.state.deck.questions[0] && this.state.deck.questions[this.state.questionIdx] && this.state.deck.questions[this.state.questionIdx].answer

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1}}>
            <Text>
              {this.state.questionIdx + 1} / {this.state.deck.questions.length}
            </Text>
          </View>
          <View style={[styles.alignment, ]}>
            <View>
              <Animated.View style={[styles.frontAnimatedStyle, {alignItems: 'center', backfaceVisibility: 'hidden', backgroundColor: 'white', opacity: this.frontOpacity,}]}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>
                  {`${question}`}
                </Text>

              </Animated.View>
              <Animated.View style={[styles.backAnimatedStyle, styles.flipCardBack, {alignItems: 'center', backfaceVisibility: 'hidden', backgroundColor: 'white', opacity: this.backOpacity}]}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>
                  {`${answer}`}
                </Text>
              </Animated.View>
            </View>
            <View>
              <Animated.View
                style={{opacity: this.frontOpacity}}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.flipCard()}}
                >
                  <Text style={{color: 'red'}}>
                    Answer
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                style={styles.flipCardBack, {opacity: this.backOpacity}}
              >
                <TouchableOpacity
                  onPress={() => this.flipCard()}
                >
                  <Text style={{color: 'red'}}>
                    Question
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'green'}]}
                onPress={() =>{
                  this.setState((state) => ({
                    ...state,
                    scoreNumerator: state.scoreNumerator + 1
                  }), this.getNext)
                }}
              >
                <Text style={{color: 'white'}}>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'red'}]}
                onPress={() => {this.getNext()}}
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
