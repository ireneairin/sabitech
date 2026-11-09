export class Sala {
  constructor({ id, nombre, aforo, ubicacion }) {
    this.id = id;
    this.nombre = nombre;
    this.aforo = aforo;
    this.ubicacion = ubicacion;
  }

  static fromJSON(json) {
    return new Sala({
      id: json.id,
      nombre: json.nombre,
      aforo: json.aforo,
      ubicacion: json.ubicacion,
    });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      aforo: this.aforo,
      ubicacion: this.ubicacion,
    };
  }
}
