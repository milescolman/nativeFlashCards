import React from 'react';
import { StyleSheet, Platform, View, Text, StatusBar } from 'react-native'
import { TabNavigator , StackNavigator, DrawerNavigator} from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import NewDeck from './components/NewDeck'
import NewQuestion from './components/NewQuestion'
import ScoreScreen from './components/ScoreScreen'
import { Constants } from 'expo'
import { white, purple } from './utils/colors'
import { setLocalNotification } from './utils/notifications'

function UdaciStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({tintColor }) => <MaterialCommunityIcons name='cards' size={25}  color={tintColor}/>
      }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      header: null,
      tabBarIcon: ({tintColor }) => <MaterialCommunityIcons name='creation' size={25}  color={tintColor}/>
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    showIcon: true,
    style: {
      height : 60,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerMode: 'none',
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerMode: 'screen',
      title: `${navigation.state.params.title}`,
    }),
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {title: 'Add Card'},
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz'
    })
  },
  ScoreScreen: {
    screen: ScoreScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Score'
    })
  }
},
{
  mode: 'modal',
  headerMode: 'screen', // QUESTION: can't configure for individual screens?
}
)

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
        <MainNavigator />
      </View>
    );
  }
}
