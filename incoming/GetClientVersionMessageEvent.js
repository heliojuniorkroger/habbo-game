import log4js from 'log4js'

const logger = log4js.getLogger()

export default (socket, packet) => {
    packet.resetIndex()
    packet.readInt()
    packet.readShort()
    const revision = packet.readString()
    logger.info(`Current revision ${revision}`)
}