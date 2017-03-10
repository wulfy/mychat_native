import {default as PluginsHelper}  from '../lib/pluginsHelper'; 

const defaultState = {};
const pluginsHelperObj = new PluginsHelper;

export default function CommandReducer(state = defaultState, action) {
  switch(action.type) {
    case "SOCKET_COMMAND_RECEIVED":
       console.log(state);
       let currentAction = {...currentAction,}
       currentAction = {...action,...pluginsHelperObj.apply(action)};
       let srvData = currentAction.message;
      return {...state,type:"array",command_data:srvData.data} ;
    default:
      return state;
  }
}