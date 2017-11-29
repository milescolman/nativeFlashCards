import { AsyncStorage } from 'react-native'
import { formatAllQuizResults, QUIZ_STORAGE_KEY} from './_quizzes'

export function getDecks () {
  return AsyncStorage.getItem(QUIZ_STORAGE_KEY)
    .then(formatAllQuizResults)
}

export function getDeck (id) {
  return getDecks().then((decks) => decks[id])
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(QUIZ_STORAGE_KEY, JSON.stringify({
    [title]: {title, questions: []}
  }))
}

export function addCardToDeck (title, card) {
  return getDeck(title).then((deck) => {
    const questions = deck['questions']
    return AsyncStorage.mergeItem(QUIZ_STORAGE_KEY, JSON.stringify({
      [title]: {title, questions: [...questions, card]}
    }))
  })
}
