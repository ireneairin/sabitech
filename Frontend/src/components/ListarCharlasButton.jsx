import { list } from "../api/charlaApi";

export function ListarCharlasButton() {
    async function listarCharlas() {
        //TODO
        console.log('listar charlas');
        const charlas = await list(); //llama a la API
        console.log('charlas listadas');
        console.log(charlas); //muestro en el console.log las charlas
    }

    return (
        <>
            <button onClick={listarCharlas}>Listar charlas</button>
        </>
    );
}
