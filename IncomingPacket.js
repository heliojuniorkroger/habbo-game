export default class {
    constructor(stream) {
        this.index = 0
        this.stream = stream
    }
    readInt() {
        const number = this.stream.readUInt32BE(this.index)
        this.index += 4
        return number
    }
    readShort() {
        const number = this.stream.readUInt16BE(this.index)
        this.index += 2
        return number
    }
    readString() {
        const strLength = this.readShort()
        const str = this.getAsString().substring(this.index, this.index + strLength)
        this.index += strLength
        return str
    }
    getAsString() {
        return this.stream.toString()
    }
    resetIndex() {
        this.index = 0
    }
}