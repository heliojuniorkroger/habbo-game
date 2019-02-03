import OutgoingPacket from '../OutgoingPacket'

export default () => {
    const packet = new OutgoingPacket(2491)
    return packet.getBuffer()
}