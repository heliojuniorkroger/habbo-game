export default class {
    constructor(header) {
        this.header = header
        this.buffer = Buffer.alloc(0)
        this.length = 0
        this.writeShort(header)
    }
    writeShort(number) {
        const buffer = Buffer.alloc(2)
        buffer.writeInt16BE(number)
        this.buffer = Buffer.concat([ this.buffer, buffer ])
        this.length += 2
    }
    writeInt(number) {
        const buffer = Buffer.alloc(4)
        buffer.writeInt32BE(number)
        this.buffer = Buffer.concat([ this.buffer, buffer ])
        this.length += 4
    }
    writeString(string) {
        const buffer = Buffer.alloc(string.length + 2)
        buffer.writeInt16BE(string.length, 0)
        buffer.write(string, 2)
        this.writeBytes(buffer)
    }
    writeBool(value) {
        this.writeByte(Buffer.from(String.fromCharCode(value)))
    }
    writeByte(value) {
        this.buffer = Buffer.concat([ this.buffer, value ])
        this.length += 1
    }
    writeBytes(value) {
        this.buffer = Buffer.concat([ this.buffer, value ])
        this.length += value.length
    }
    getBuffer() {
        const buffer = Buffer.alloc(4)
        buffer.writeInt32BE(this.length, 0)
        this.buffer = Buffer.concat([ buffer, this.buffer ])
        return this.buffer
    }
}