// utilities for populating the quizzes

import { AsyncStorage } from 'react-native'

export const QUIZ_STORAGE_KEY = '@FlashCards:quizzes'

const quizData = {
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

function setQuizData() {
  AsyncStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizData))

  return quizData
}

export function formatAllQuizResults (results) {
  return results === null
  ? setQuizData()
  : JSON.parse(results)
}
