const TYPE_MESSAGE = 'message';
const TYPE_SERVER = 'server';
const TYPE_ERROR = 'error';
const TYPE_COMMAND = 'command';
const COMMAND_UPDATE_USR_LIST = 'update_user_list';
const COMMAND_LISTUSER = 'list_users';
const COMMAND_DISPLAY_MSG = 'display';

function sendText(socket,type,message,channel) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    type: type,
    text: message,
    date: Date.now(),
    channel : channel
  };

  // Send the msg object as a JSON-formatted string.
  socket.send(JSON.stringify(msg));
}

var socket = null;

export default function websocketMiddleware() {
  return next => action => {

  	const { type, ...rest } = action;
  	console.log("websock " + action.type);

  	//if the action type is not handle by this middleware
  	if(action.type != "CREATE_SOCKET" && action.type != "SEND_MESSAGE" && action.type != "DISCONNECT_SOCKET")
  		return next(action);


    if(action.type === 'CREATE_SOCKET')
      socket = new WebSocket("ws://localhost:8100",action.protocol);

    if(action.type === "SEND_MESSAGE" && socket)
    {
      sendText(socket,action.messageType,action.message,action.channel);
      return next(action);
    }

    if(action.type === "DISCONNECT_SOCKET")
      socket.close();
  	 

  	 socket.onopen = () => {
      // connection opened
      console.log("connexion opened");
      /*if(wainting_messages.length >0)
        for(index in wainting_messages)
        {
          socket.send(wainting_messages[index]);
        } */
        sendText(socket,"init",action.login,action.channel);
        return next({ ...rest, type: "SOCKET_OPENED", socket:socket , login:action.login});
    };

   socket.onmessage= (e) => {
      // a message was received
      let message = JSON.parse(e.data);
      console.log("message reçu ");
      console.log(message);
      let type = "SOCKET_MESSAGE_RECEIVED";
      if(message.command != false)
        type = "SOCKET_COMMAND_RECEIVED"

      return next({ ...rest, type: type , message:message });//Gérer le cas d un message array pour transmettre une nouvelle action pour gérer la liste user par ex
    };

    socket.onerror = (e) => {
      // an error occurred
      let message = e.data;
      console.log("error " + e.message);
      return next({ ...rest, type: "SOCKET_ERROR_MESSAGE", message:"connexion error" });
    };

   socket.onclose = (e) => {
      // connection closed
      let message = e.code + ":" + e.reason;
      console.log("fermeture : " + e.code, e.reason);
      return next({ ...rest, type: "SOCKET_CLOSED", message:message });
    };

    /*console.log(socket);
    return socket;*/

  }

}