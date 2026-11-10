export class Reserva {
  constructor({ id, estado, fecha_reserva, qr, id_usuario }) {
    this.id = id;
    this.estado = estado;
    this.fecha_reserva = fecha_reserva;
    this.qr = qr;
    this.id_usuario = id_usuario;
  }

  static fromJSON(json) {
    return new Reserva({
      id: json.id,
      estado: json.estado,
      fecha_reserva: json.fecha_reserva,
      qr: json.qr,
      id_usuario: json.id_usuario,
    });
  }

  toJSON() {
    return {
      id: this.id,
      estado: this.estado,
      fecha_reserva: this.fecha_reserva,
      qr: this.qr,
      id_usuario: this.id_usuario,
    };
  }
}
