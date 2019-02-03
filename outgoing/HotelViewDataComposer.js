import OutgoingPacket from '../OutgoingPacket'

export default (data, key) => {
    const packet = new OutgoingPacket(1745)
    packet.writeString(data)
    packet.writeString(key)
    return packet.getBuffer()
}