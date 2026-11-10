export class Consulta {
  constructor({ id, asunto, email, mensaje, estado, id_usuario }) {
    this.id = id;
    this.asunto = asunto;
    this.email = email;
    this.mensaje = mensaje;
    this.estado = estado;
    this.id_usuario = id_usuario;
  }

  static fromJSON(json) {
    return new Consulta({
      id: json.id,
      asunto: json.asunto,
      email: json.email,
      mensaje: json.mensaje,
      estado: json.estado,
      id_usuario: json.id_usuario,
    });
  }

  toJSON() {
    return {
      id: this.id,
      asunto: this.asunto,
      email: this.email,
      mensaje: this.mensaje,
      estado: this.estado,
      id_usuario: this.id_usuario,
    };
  }
}
