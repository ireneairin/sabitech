export class Imparte {
  constructor({ id_usuario, id_charla }) {
    this.id_usuario = id_usuario;
    this.id_charla = id_charla;
  }

  static fromJSON(json) {
    return new Imparte({
      id_usuario: json.id_usuario,
      id_charla: json.id_charla,
    });
  }

  toJSON() {
    return {
      id_usuario: this.id_usuario,
      id_charla: this.id_charla,
    };
  }
}
