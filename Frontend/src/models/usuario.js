export class Usuario {
  constructor({ id, nombre, apellido, password, ciudad, email, telefono, fecha_registro, rol }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.password = password;
    this.ciudad = ciudad;
    this.email = email;
    this.telefono = telefono;
    this.fecha_registro = fecha_registro;
    this.rol = rol;
  }

  static fromJSON(json) {
    return new Usuario({
      id: json.id,
      nombre: json.nombre,
      apellido: json.apellido,
      password: json.password,
      ciudad: json.ciudad,
      email: json.email,
      telefono: json.telefono,
      fecha_registro: json.fecha_registro,
      rol: json.rol,
    });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      password: this.password,
      ciudad: this.ciudad,
      email: this.email,
      telefono: this.telefono,
      fecha_registro: this.fecha_registro,
      rol: this.rol,
    };
  }
}
