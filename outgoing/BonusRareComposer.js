import OutgoingPacket from '../OutgoingPacket'

export default user => {
    const packet = new OutgoingPacket(1533)
    packet.writeString('prizetrophy_breed_gold') // reward name
    packet.writeInt(0) // reward id
    packet.writeInt(120) // cost
    return packet.getBuffer()
}