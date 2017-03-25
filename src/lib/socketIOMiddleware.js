const TYPE_ERROR = 'message_error';
const COMMAND_UPDATE_USR_LIST = 'update_user_list';
import SocketIOClient from 'socket.io-client';

function sendText(socket,type,message) {
  // Construct a msg object containing the data the server needs to process the message from the chat client.
  var msg = {
    text: message,
    date: Date.now()
  };

  // Send the msg object as a JSON-formatted string.
  socket.emit(type,msg);
}

var socket = null;

export default function socketIOMiddleware() {
  return next => action => {

    //const { type, ...rest } = action;

    console.log("websock " + action.type);

    //if the action type is not handle by this middleware
    if(action.type !== "CREATE_SOCKET" && action.type !== "SEND_MESSAGE" && action.type !== "DISCONNECT_SOCKET")
      return next(action);

    if(action.type === "SEND_MESSAGE" && socket)
    {
      sendText(socket,action.messageType,action.message);
      return next(action);
    }

    if(action.type === 'CREATE_SOCKET')
      socket = SocketIOClient("http://localhost:8100", {jsonp: false});//passer jsonp à false en mode debug sinon plante ... :/

    if(action.type === "DISCONNECT_SOCKET" && socket)
      socket.close();
     

     socket.on("connection",(e) => {
      // connection opened
      console.log("connexion opened");
      /*if(wainting_messages.length >0)
        for(index in wainting_messages)
        {
          socket.send(wainting_messages[index]);
        } */
        sendText(socket,"init",action.login,action.channel);
        return next(action);
    });

     socket.on(COMMAND_UPDATE_USR_LIST,(e)=>{
      let message = JSON.parse(e);
      console.log(COMMAND_UPDATE_USR_LIST + " received");
      return next({...action,type:COMMAND_UPDATE_USR_LIST,message:message});
     });


   socket.on("requestInit",(e) => {
      // connection opened
      console.log("connexion opened");
      sendText(socket,"init",action.login,action.channel);
      return next({ ...action, type: "SOCKET_OPENED", socket:socket , login:action.login});
    });

   socket.on("message",(e) => {
      // a message was received
      let message = JSON.parse(e);
      console.log("message reçu ");
      console.log(message);
      let type = "SOCKET_MESSAGE_RECEIVED";
      return next({ ...action, type: type , message:message });//Gérer le cas d un message array pour transmettre une nouvelle action pour gérer la liste user par ex
    });

   socket.on(TYPE_ERROR,(e) => {
      let message = JSON.parse(e);
      console.log("error " + e.message);
      return next({ ...action, type: "SOCKET_ERROR_MESSAGE", message:message });
   });

    socket.onerror = (e) => {
      // an error occurred
      console.log("error " + e.message);
      return next({ ...action, type: "SOCKET_ERROR_MESSAGE", message:"connexion error" });
    };

   socket.onclose = (e) => {
      // connection closed
      let message = e.code + ":" + e.reason;
      console.log("fermeture : " + e.code, e.reason);
      return next({ ...action, type: "SOCKET_CLOSED", message:message });
    };

    /*console.log(socket);
    return socket;*/

  }

}