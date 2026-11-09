export class Acceso {
  constructor({ id, fecha_hora, id_usuario }) {
    this.id = id;
    this.fecha_hora = fecha_hora;
    this.id_usuario = id_usuario;
  }

  static fromJSON(json) {
    return new Acceso({
      id: json.id,
      fecha_hora: json.fecha_hora,
      id_usuario: json.id_usuario,
    });
  }

  toJSON() {
    return {
      id: this.id,
      fecha_hora: this.fecha_hora,
      id_usuario: this.id_usuario,
    };
  }
}
