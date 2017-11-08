import React from 'react';
import { StyleSheet, Platform, View, Text, StatusBar } from 'react-native'
import { TabNavigator , StackNavigator, DrawerNavigator} from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import { Constants } from 'expo'
import { white, purple } from './utils/colors'

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
        tabBarIcon: ({tintColor }) => <MaterialCommunityIcons name='cards' size={30}  color={tintColor}/>
      }
  },
},
{
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    showIcon: true,
    style: {
      height : 56,
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

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
        <Tabs />
      </View>
    );
  }
}
