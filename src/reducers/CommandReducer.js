import {default as PluginsHelper}  from '../lib/pluginsHelper'; 

const defaultState = {};
const pluginsHelperObj = new PluginsHelper();

export default function CommandReducer(state = defaultState, action) {
  let currentAction = {...action,...pluginsHelperObj.apply(action)};

  switch(action.type) {
    case "update_user_list":
       console.log("update_user_list");
       console.log(action);
       let srvData = currentAction.message;
      return {...state,command_data:srvData.data,type:action.type} ;
    default:
      return state;
  }
}