export function sendMessage(message,channel)
{
  return {
    type: 'SEND_MESSAGE',
    messageType: 'message',
    message:message,
    channel:channel
  }
}

