import { useState } from "react";

export function HelloWorld(props) {
  const [valor, setValor] = useState(12345); //lectura, escritura
  const [charlas, setCharlas] = useState([]);

  function incrementar() {
    setValor(valor + 1);
  }

  return (
    <>
      <div>Hello World ${props.nombre} {valor}</div> {/* padre a hijo */}
      {/* <button onClick={props.clickar}>Click me</button> //hijo a padre */}
      <button onClick={incrementar}>Click me</button>
      {/* Padre App hijo ejemplo.jsx */}
    </>
  );
}
