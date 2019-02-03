import OutgoingPacket from '../OutgoingPacket'

export default () => {
    const packet = new OutgoingPacket(3928)
    return packet.getBuffer()
}