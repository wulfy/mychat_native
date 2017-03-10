import React from 'react';
import { connect }            from 'react-redux';
import {
  Text,
  TextInput,
  Image,
  View
} from 'react-native';


export default connect(state => ({ command:state.command}))(
 class ListUsers extends React.Component {
  render() 
  {
  	var {command} = this.props;
    console.log("----------command-----------");
    console.log(command); 
    var command_data = command.command_data;
    var usersListHtml = null;

    if(command_data)
      usersListHtml = command_data.map((userData) => <Text>{userData.login}</Text>);
    //utiliser un composant pour interprêter le contenu du serveur (et essayer de ne pas avoir à s'en soucier ici)
    return (
      <View id="userList">
          	{usersListHtml}
      </View>

    );
  }
})