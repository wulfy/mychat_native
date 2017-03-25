const defaultState = {connected:false};

export default function SocketReducer(state = defaultState, action) {
  switch(action.type) {
    case "SOCKET_OPENED":
      return {socket:action.socket,connected:true,login:action.login} ; 
     case "SOCKET_CLOSED":
      return {connected:false} ;
    default:
      return state;
  }
}