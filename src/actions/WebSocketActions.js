export function createSocket(protocol,login,channel)
{
  return {
    type: 'CREATE_SOCKET',
    protocol: protocol,
    login:login,
    channel:channel
  }
}

export function disconnect()
{
  return {
    type: 'DISCONNECT_SOCKET'
  }
}
