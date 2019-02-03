import OutgoingPacket from '../OutgoingPacket'

export default () => {
    const packet = new OutgoingPacket(2033)
    packet.writeBool(true)
    packet.writeBool(true)
    packet.writeBool(true)
    return packet.getBuffer()
}