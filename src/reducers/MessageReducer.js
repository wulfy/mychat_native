import {default as PluginsHelper}  from '../lib/pluginsHelper'; 

const defaultState = {messages:[]};
const TYPE_ERROR = 'error';
const SERVER_LOGIN = 'server';
const pluginsHelperObj = new PluginsHelper;
console.log(PluginsHelper);

export default function MessageReducer(state = defaultState, action) {
  switch(action.type) {
    case "SOCKET_MESSAGE_RECEIVED":
      console.log("message reducer");
      

      var currentAction = action;
      let {message} = currentAction;
      var {messages,...rest} = state;
      let {type,login,command,data} = message;
      var color = login==SERVER_LOGIN?'blue':'';
      color = type==TYPE_ERROR?"red":color;

      let newMessage = {message:data,command:command, type:type, login:login, style:{color:color}};

      currentAction = {...currentAction,message:newMessage};

      console.log("currentAction");console.log(currentAction);
      
      currentAction = {...currentAction,...pluginsHelperObj.apply(currentAction)};
      console.log("currentAction");
      console.log(currentAction);
      messages.push(currentAction.message)
      return {...rest,type:'message',messages:messages} ;
    case "SOCKET_ERROR_MESSAGE":
        var {messages,...rest} = state; 
        messages.push({message:action.message,style:{color:"red"}})
        return {...rest,type:"message",messages:messages} ;
    default:
      return state;
  }
}