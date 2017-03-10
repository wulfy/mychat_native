import React from 'react';
import { connect }            from 'react-redux';
import {sendMessage}  from '../actions/MessageActions';
import {
  Text,
  TextInput,
  Image,
  View
} from 'react-native';

export default connect(state => ({ message: state.message}))(
 class ChatMessages extends React.Component {
  render() 
  {
  	let messages = this.props.message ? this.props.message.messages : [];
  	messages = typeof messages != "undefined" ? messages  : [];

    console.log("rendering message");
    console.log(this.props.message);
    console.log("render");
    //utiliser un composant pour interprêter le contenu du serveur (et essayer de ne pas avoir à s'en soucier ici)
    return (
      <View id="messages" width="100%" heigth="auto">
          	<Text> Last message : </Text>
          	{messages.map((message,index)=> <View>
              <Text id={index} className="message" style={message.style}>{message.login}</Text> 
            {message.message}
            </View>)}
      </View>

    );
  }
})