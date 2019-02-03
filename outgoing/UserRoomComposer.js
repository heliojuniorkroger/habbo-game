import OutgoingPacket from '../OutgoingPacket'

export default (homeRoom, newRoom) => {
    const packet = new OutgoingPacket(2491)
    packet.writeInt(homeRoom)
    packet.writeInt(newRoom)
    return packet.getBuffer()
}