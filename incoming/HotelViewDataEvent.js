import * as outgoing from '../outgoing'

export default (socket, packet) => {
    packet.resetIndex()
    packet.readInt()
    packet.readShort()
    const articles = packet.readString()
    if (articles.indexOf(';') > -1) {
        articles.split(';').map(article => {
            if (article.indexOf(',') > -1) {
                socket.write(outgoing.HotelViewDataComposer(article, article.split(',')[article.split(',').length - 1]))
            } else {
                socket.write(outgoing.HotelViewDataComposer(articles, article))
            }
        })
    } else {
        socket.write(outgoing.HotelViewDataComposer(articles, articles.split(',')[articles.split(',').length - 1]))
    }
    socket.write(outgoing.BonusRareComposer(socket.user))
}