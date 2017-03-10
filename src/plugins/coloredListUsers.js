import React  from 'react';
import {
  Text,
  Image,
  View
} from 'react-native';
/*
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}

*/


export default class ColoredListUsers{

  checkActivate = (type) =>
  {
  		return type == "SOCKET_COMMAND_RECEIVED";
  }

 changeAction = (action) =>
 {
 	//console.log("change action :");
 	//console.log(action);
 	let newAction = action;
 	let newUsersList = [];
 	let currentUserData = null;
 	let loginValue = null;
 	let loginStyle = null;
 	let id =null;
 	if(action.message.data)
 	{
 		for(var i=0;i<action.message.data.length;i++)
 		{
 			currentUserData = action.message.data[i];
 			if(currentUserData.login === 'ludo')
 				loginStyle={color:'red'};
 			else
 				loginStyle={color:'default'};

 			id = 'userList-'+i;
 			loginValue = <Text id={id} style={loginStyle}> {currentUserData.login} </Text>
 			newUsersList[i] = {...currentUserData,login:loginValue}
 		}
 		
 	}
 	console.log("newUsersList");
 	console.log(newUsersList);
 	console.log(action.message);

 	newAction = {...action,message:{...action.message,data:newUsersList}};

 	return newAction;

 }

 render()
 {

 	return(null);
 }

};
