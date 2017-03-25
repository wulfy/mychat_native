import {default as PluginsHelper}  from '../lib/pluginsHelper'; 

const defaultState = {messages:[],error_messages:[]};
const TYPE_ERROR = 'error';
const SERVER_LOGIN = 'server';
const pluginsHelperObj = new PluginsHelper();
console.log(PluginsHelper);

export default function MessageReducer(state = defaultState, action) {

  if(action.type === "SOCKET_MESSAGE_RECEIVED" || action.type === "SOCKET_ERROR_MESSAGE")
  {
    var {messages,error_messages,...rest} = state;
    var currentAction = action;
    var {data,login} = currentAction.message;
    var {text,date} = data;
    currentAction = {...currentAction,...pluginsHelperObj.apply(currentAction)};
        data =  currentAction.message.data;
    text = data.text;
    date = data.date;
    console.log("currentAction");
      console.log(currentAction);
  }
  switch(action.type) {
    case "SOCKET_MESSAGE_RECEIVED":
      console.log("message reducer"); 
      console.log(action);
     
      let color = login===SERVER_LOGIN?'blue':'';
      console.log("data");
      console.log(data);
      console.log(text);
      let newMessage = {text:text,login:login, style:{color:color}, timestamp:date};

      currentAction = {...currentAction,message:newMessage};
      
      messages.push(currentAction.message)
      return {...state,type:'message',messages:messages} ;
    case "SOCKET_ERROR_MESSAGE":

        error_messages.push({text:data,style:{color:"red"}});
        return {...rest,type:"message",error_messages:error_messages} ;
    default:
      return state;
  }
}