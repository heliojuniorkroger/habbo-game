import OutgoingPacket from '../OutgoingPacket'

export default debugging => {
    const packet = new OutgoingPacket(3284)
    packet.writeBool(debugging)
    return packet.getBuffer()
}