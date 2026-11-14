import { Sala } from './sala.js';

export class Charla {
  constructor({ id, nombre, descripcion, ponente, categoria, fecha, hora_inicio, hora_fin, id_sala }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.ponente = ponente;
    this.categoria = categoria;
    this.fecha = fecha;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
    this.id_sala = id_sala;
  }

  static fromJSON(json) {
    return new Charla({
      id: json.id,
      nombre: json.nombre,
      descripcion: json.descripcion,
      ponente: json.ponente,
      categoria: json.categoria,
      fecha: json.fecha,
      hora_inicio: json.hora_inicio,
      hora_fin: json.hora_fin,
      id_sala: json.sala ? Sala.fromJSON(json.sala) : null,
    });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      ponente: this.ponente,
      categoria: this.categoria,
      fecha: this.fecha,
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
      id_sala: this.id_sala,
    };
  }
}
