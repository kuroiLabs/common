export class Packet {

  private buffer: Buffer

  private readPosition: int = 0

  private writePosition: int = 0

  private encoder = new TextEncoder()

  constructor(data: Buffer) {
    if (!(data instanceof Buffer)) {
      throw new Error('Invalid data buffer')
    }
    this.buffer = data
  }

  public data(): Buffer {
    return this.buffer
  }

  public readUint8(): uint8 {
    const _uint8: uint8 = this.buffer.readUInt8(this.readPosition)
    this.readPosition += Uint8Array.BYTES_PER_ELEMENT
    return _uint8
  }

  public readUint8Array(_length?: int): Uint8Array {
    return new Uint8Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeUint8(_uint8: uint8): void {
    this.buffer.writeUInt8(_uint8, this.writePosition)
    this.writePosition += Uint8Array.BYTES_PER_ELEMENT
  }

  public writeUint8Array(_uint8s: uint8[] | Uint8Array): void {
    _uint8s.forEach(_uint8 => this.writeUint8(_uint8))
  }

  public readByte(): byte {
    const _byte: byte = this.buffer.readInt8(this.readPosition)
    this.readPosition += Int8Array.BYTES_PER_ELEMENT
    return _byte
  }

  public readBytes(_length?: int): Int8Array {
    return new Int8Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeByte(_byte: byte): void {
    this.buffer.writeUInt8(_byte, this.writePosition)
    this.writePosition += Int8Array.BYTES_PER_ELEMENT
  }

  public writeByteArray(_bytes: byte[] | Int8Array): void {
    _bytes.forEach((_byte: byte) => this.writeByte(_byte))
  }

  public readUint32(): uint32 {
    const _uint32 = this.buffer.readUInt32BE(this.readPosition)
    this.readPosition += Uint32Array.BYTES_PER_ELEMENT
    return _uint32
  }

  public readUint32Array(_length: int): Uint32Array {
    return new Uint32Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeUint32(_uint32: uint32): void {
    this.buffer.writeUInt32BE(_uint32, this.writePosition)
    this.writePosition += Uint32Array.BYTES_PER_ELEMENT
  }

  public writeUint32Array(_uint32s: uint32[] | Uint32Array): void {
    _uint32s.forEach(_uint32 => this.writeUint32(_uint32))
  }

  public readInt32(): int32 {
    const _int32 = this.buffer.readInt32BE(this.readPosition)
    this.readPosition += Int32Array.BYTES_PER_ELEMENT
    return _int32
  }

  public readInt32Array(_length: int): Int32Array {
    return new Int32Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeInt32(_int32: int32): void {
    this.buffer.writeInt32BE(_int32, this.writePosition)
    this.writePosition += Int32Array.BYTES_PER_ELEMENT
  }

  public writeInt32Array(_int32s: int32[] | Int32Array): void {
    _int32s.forEach(_int32 => this.writeInt32(_int32))
  }

  public readFloat(): float {
    const _float: float = this.buffer.readFloatBE(this.readPosition)
    this.readPosition += Float32Array.BYTES_PER_ELEMENT
    return _float
  }

  public readFloats(_length: int): Float32Array {
    return new Float32Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeFloat(_float: float): void {
    this.buffer.writeFloatBE(_float, this.writePosition)
    this.writePosition += Float32Array.BYTES_PER_ELEMENT
  }

  public writeFloats(_floats: float[] | Float32Array): void {
    _floats.forEach(_float => this.writeFloat(_float))
  }

  public readString(end?: int): string {
    const _string = this.buffer.toString('utf-8', this.readPosition, end || this.buffer.byteLength)
    this.readPosition = end || this.buffer.byteLength
    return _string
  }

  public writeString(_string: string): void {
    this.buffer.write(_string, this.writePosition, 'utf-8')
    this.writePosition += this.encoder.encode(_string).byteLength
  }

}