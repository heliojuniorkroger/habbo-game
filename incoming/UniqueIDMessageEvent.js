import log4js from 'log4js'

const logger = log4js.getLogger()

export default (socket, packet) => {
    packet.readString()
    const id = packet.readString()
    logger.info(`Unique ID ${id}`)
}