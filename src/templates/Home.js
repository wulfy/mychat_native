import React from 'react';
import { connect }    from 'react-redux';
import {sendMessage}  from '../actions/MessageActions';
import {createSocket} from '../actions/WebSocketActions';
import ChatMessages from './ChatMessages';
import ListUsers from './ListUsers';
import Login from './Login';
import {
  Text,
  TextInput,
  Image,
  View,
  Button,
  Form
} from 'react-native';

export default connect(state => ({ message: state.message, socket:state.socket}))(
 class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  onChangeMessage = (text) =>
  {
    this.setState({messageInput:text});
  }
  onSendMessage = (e) =>
  {
  	var {dispatch,socket} = this.props;
    var {messageInput} = this.state;
    var {login,channel} = socket;
  	e.preventDefault();
    console.log("channel" + channel);
  	if(socket.connected)
  	{
      dispatch(sendMessage(messageInput,'c1'));
  	}

  	//dispatch(MessageActions.sendMessage(e.target.message.value,e.target.color.value,socket));
  }
  render() 
  {
  	console.log(this.props.message);
  	var {socket} = this.props;
  	let messages = this.props.message ? this.props.message.messages : [];

  	let disabled = !socket.connected;
  	console.log(messages);
  	messages = typeof messages != "undefined" ? messages  : [];

    console.log("rendering home");
    console.log(messages);
    var socketMessage = !disabled?"connected":"Not connected";
    var socketMessageStyle = !disabled?{color:"green"}:{color:"red"};
    //utiliser un composant pour interprêter le contenu du serveur (et essayer de ne pas avoir à s'en soucier ici)
    return (
      
      <View id="homecontent">
          	<Text> Hello you are in the chat home ! </Text>
            <Login/>
            
          	{!disabled && <View>
                <Button disabled={disabled} title="send message" onPress={this.onSendMessage}/>
                <TextInput style={{height: 40}} id="message" onChangeText={this.onChangeMessage}/>
              </View>
            }
            
            
          	{!disabled && <ChatMessages/> }
            {!disabled && <ListUsers/> }
      </View>


    );
  }
})