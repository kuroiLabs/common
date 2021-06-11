export class Packet {

  private buffer: ArrayBuffer

  private readPosition: int = 0

  private writePosition: int = 0

  private encoder = new TextEncoder()

  private decoder = new TextDecoder()

  constructor(buffer: ArrayBuffer) {
    this.buffer = buffer
  }

  public data(): ArrayBuffer {
    return this.buffer
  }

  public readUint8(): uint8 {
    const _uint8: uint8 = new DataView(this.buffer, this.readPosition).getUint8(0)
    this.readPosition += Uint8Array.BYTES_PER_ELEMENT
    return _uint8
  }

  public readUint8Array(_length: int): Uint8Array {
    return new Uint8Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeUint8(_uint8: uint8): void {
    const _view = new DataView(this.buffer)
    _view.setUint8(this.writePosition, _uint8)
    this.writePosition += Uint8Array.BYTES_PER_ELEMENT
  }

  public writeUint8Array(_uint8s: byte[] | Uint8Array): void {
    _uint8s.forEach((_uint8: byte) => this.writeUint8(_uint8))
  }

  public readByte(): byte {
    const _byte: byte = new DataView(this.buffer, this.readPosition).getInt8(0)
    this.readPosition += Int8Array.BYTES_PER_ELEMENT
    return _byte
  }

  public readByteArray(_length?: int): Int8Array {
    return new Int8Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeByte(_byte: byte): void {
    const _view = new DataView(this.buffer)
    _view.setInt8(this.writePosition, _byte)
    this.writePosition += Int8Array.BYTES_PER_ELEMENT
  }

  public writeBytes(_bytes: byte[] | Uint8Array): void {
    _bytes.forEach((_byte: byte) => this.writeByte(_byte))
  }

  public readUint32(): uint32 {
    const _uint32: uint32 = new DataView(this.buffer, this.readPosition).getUint32(0)
    this.readPosition += Uint32Array.BYTES_PER_ELEMENT
    return _uint32
  }

  public readUint32Array(_length: int): Uint32Array {
    return new Uint32Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeUint32(_uint32: uint32): void {
    const _view = new DataView(this.buffer)
    _view.setUint32(this.writePosition, _uint32)
    this.writePosition += Uint32Array.BYTES_PER_ELEMENT
  }

  public writeUint32Array(_uint32s: uint32[] | Uint32Array): void {
    _uint32s.forEach((_uint32: uint32) => this.writeUint32(_uint32))
  }

  public readInt32(): int32 {
    const _int32: int32 = new DataView(this.buffer, this.readPosition).getInt32(0)
    this.readPosition += Int32Array.BYTES_PER_ELEMENT
    return _int32
  }

  public readInt32Array(_length: int): Int32Array {
    return new Int32Array(this.buffer.slice(this.readPosition, _length || this.buffer.byteLength))
  }

  public writeInt32(_int32: int32): void {
    const _view = new DataView(this.buffer)
    _view.setInt32(this.writePosition, _int32)
    this.writePosition += Int32Array.BYTES_PER_ELEMENT
  }

  public writeInt32Array(_int32s: int32[] | Int32Array): void {
    _int32s.forEach((_uint32: int32) => this.writeUint32(_uint32))
  }

  public readFloat(): float {
    const _float: float = new DataView(this.buffer, this.readPosition).getFloat32(0)
    this.readPosition += Float32Array.BYTES_PER_ELEMENT
    return _float
  }

  public writeFloat(_float: float): void {
    const _view = new DataView(this.buffer)
    _view.setFloat32(this.writePosition, _float)
    this.writePosition += Float32Array.BYTES_PER_ELEMENT
  }

  public writeFloatArray(_floats: float[] | Float32Array): void {
    _floats.forEach((_float: float) => this.writeFloat(_float))
  }

  public readString(end?: int): string {
    const _bytes: Uint8Array = new Uint8Array(this.buffer, end || this.readPosition)
    const _string: string = this.decoder.decode(_bytes)
    this.readPosition = end || _bytes.byteLength
    return _string
  }

  public writeString(_string: string): void {
    const _bytes: Uint8Array = this.encoder.encode(_string)
    _bytes.forEach(_byte => this.writeByte(_byte))
  }

}