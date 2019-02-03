import * as outgoing from '../outgoing'

export default (socket, packet) => {
    socket.write(outgoing.BonusRareComposer(socket.user))
}