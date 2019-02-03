import OutgoingPacket from '../OutgoingPacket'

export default () => {
    const packet = new OutgoingPacket(340)
    packet.writeInt(0) // effect
    packet.writeInt(0) // 0
    packet.writeInt(0) // duration
    packet.writeInt(1) // total
    packet.writeInt(0) // remaining time?
    packet.writeBool(false) // active
    return packet.getBuffer()
}