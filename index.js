import net from 'net'
import log4js from 'log4js'
import r from 'rethinkdb'
import IncomingPacket from './IncomingPacket'
import RethinkConnection from './RethinkConnection'
import * as incoming from './incoming'

const logger = log4js.getLogger()
logger.level = 'debug'

const INCOMING_PACKETS = {
    4000: incoming.GetClientVersionMessageEvent,
    2490: incoming.UniqueIDMessageEvent,
    2419: incoming.SSOTicketMessageEvent,
    957: incoming.HotelViewRequestBonusRareEvent,
    2912: incoming.HotelViewDataEvent
}

logger.info('Starting Habbo Emulator project...')

const server = net.createServer(async (socket, err) => {
    if (err) throw err
    try {
        const connection = await r.connect({ host: 'localhost', port: 28015, db: 'habbo' })
        RethinkConnection.store(connection)
        socket.on('data', data => {
            if (data[0] === 60) {
                socket.write(`
                    <?xml version="1.0"?>\r\n
                    <!DOCTYPE cross-domain-policy SYSTEM "/xml/dtds/cross-domain-policy.dtd">\r\n
                    <cross-domain-policy>\r\n
                        <allow-access-from domain="*" to-ports="*" />\r\n
                    </cross-domain-policy>\0
                `)
            } else {
                const packet = new IncomingPacket(data)
                packet.readInt()
                const header = packet.readShort()
                if (INCOMING_PACKETS[header]) {
                    INCOMING_PACKETS[header](socket, packet)
                } else {
                    logger.warn(`Unhandled packet ${header}`)
                }
            }
        })
    } catch (err) {
        throw err
    }
})

server.listen(30000, () => logger.info('Here we go!'))