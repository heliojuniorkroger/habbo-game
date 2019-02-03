import log4js from 'log4js'
import r from 'rethinkdb'
import RethinkConnection from '../RethinkConnection'
import * as outgoing from '../outgoing'

const logger = log4js.getLogger()

export default async (socket, packet) => {
    try {
        const sso = packet.readString()
        const cursor = await r.table('users').filter(r.row('sso').eq(sso)).run(RethinkConnection.connection)
        const users = await cursor.toArray()
        if (users.length) {
            const user = users[0]
            socket.user = user
            logger.info(`Hello ${user.username}!`)
            socket.write(outgoing.SecureLoginOKComposer())
            socket.write(outgoing.UserRoomComposer(user.home_room, 0))
            socket.write(outgoing.UserEffectsListComposer())
            // user clothes composer
            socket.write(outgoing.NewUserIdentityComposer(user.registered_at))
            socket.write(outgoing.SessionRightsComposer())
            socket.write(outgoing.SomeConnectionComposer())
            socket.write(outgoing.DebugConsoleComposer(true))
            // so much more composers
        } else {
            logger.error(`User not found with ticket ${sso}`)
            socket.disconnect()
        }
    } catch (err) {
        throw err
    }
}