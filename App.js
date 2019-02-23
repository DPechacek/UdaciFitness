import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from "./components/AddEntry";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import EntryDetail from './components/EntryDetail';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
      <View style={{backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    History: History,
    AddEntry: AddEntry,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
    
        if (routeName === 'History') {
          iconName = 'ios-bookmarks';
        } else if (routeName === 'AddEntry') {
          iconName = 'plus-square';
          IconComponent = FontAwesome;
        }
    
        return <IconComponent name={iconName} size={30} color={tintColor}/>
      },
    }),
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowRadius: 6,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
    },
  }
);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    EntryDetail: {
      screen: EntryDetail,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      }),
    },
  }
);

const MainContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
        <Provider store={createStore(reducer)}>
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
            <MainContainer />
          </View>
        </Provider>
    );
  }
}