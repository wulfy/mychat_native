import React from 'react';
import { connect }            from 'react-redux';
import {createSocket,disconnect} from '../actions/WebSocketActions';
import {
  Text,
  TextInput,
  Image,
  View,
  Form,
  Button
} from 'react-native';


const protocol = "chat";

export default connect(state => ({ socket:state.socket}))(
 class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  login = (e) =>
  {
    var {dispatch} = this.props;
    var {loginInput,channelInput} = this.state;
    e.preventDefault();
    var login = loginInput;
    var channel = channelInput;

    dispatch(createSocket(protocol,login,channel));
  }
  onChangeLogin= (text) => {
    this.setState({loginInput:text});
  }
  onChangeChannel= (text) => {
    this.setState({channelInput:text});
  }
  disconnect = (e) => {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(disconnect());
  }
  render() 
  {
  	var {socket} = this.props;
    var login = (socket.login)? socket.login : 'no login' ;
    let connected = (socket.connected) ? socket.connected : false;

    var socketMessage = connected?"connected":"Not connected";
    var socketMessageStyle = connected?{color:"green"}:{color:"red"};
    console.log("rendering Login");
    //utiliser un composant pour interprêter le contenu du serveur (et essayer de ne pas avoir à s'en soucier ici)
    return (
      <View id="login">
          	{!connected && <View id="loginform">
              <Text>Login:</Text>
              <TextInput id="login" onChangeText={this.onChangeLogin} editable={true} maxLength={40} style={{height: 15}} />
              <Text>Channel:</Text>
              <TextInput id="channel"  onChangeText={this.onChangeChannel} editable={true} maxLength={40} style={{height: 15}} />
              <Button disabled={connected} title="Connect" onPress={this.login}/> 
            </View>}
            {connected && <View id='logininfos'> 
            <Text>{login}</Text> 
            <Button id='disconnect' onPress={this.disconnect} title="disconnect"/> 
            </View>}

            <Text style={socketMessageStyle}>{socketMessage}</Text>
      </View>

    );
  }
})