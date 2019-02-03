import moment from 'moment'
import OutgoingPacket from '../OutgoingPacket'

export default registeredAt => {
    const packet = new OutgoingPacket(3738)
    const getNoobStatus = accountAge => {
        if (accountAge < 86400) return 2
        if (accountAge < 259200) return 1
    }
    packet.writeInt(getNoobStatus(moment().unix() - registeredAt))
    return packet.getBuffer()
}