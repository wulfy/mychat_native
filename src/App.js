import React,{ Component }  from 'react';
//import logo from './logo.svg';
import Home from './templates/Home'; 
//import './App.css';
import {
  Text,
  TextInput,
  Image,
  View
} from 'react-native';

class App extends Component {
  render() {
    var logo = null;
    return (
      <View className="App">
          <Text>{"\n"}{"\n"}{"\n"}Test</Text>
          
          <Text>Welcome to React</Text>
          <Text className="App-intro">To get started, edit src/App.js and save to reload.</Text>
      
        <Home />
      </View>
    );
  }
}

export default App;
