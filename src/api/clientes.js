//este archivo tendra las funciones del crud para consumir nuestra API REST echa con json-server, aqui consumiremos la api por medio de su url, pero por seguridad utilizamos variables de entorno para no exponer directamente la url y los demas datos.Cada herramienta de react utiliza una forma diferente de hacer estas variables, en el caso de vite se deben de nombrar anteponiendo la palabra "VITE_". Despues de hacer este archivo de variables de entorno debo reiniciar el servidor.Esta funcion se la pasamos al index que es la que tiene la funcion loader donde se cargan los datos. Tener en cuenta que el servidor de npm run dev y el de json-server deben de estar prendidos o si no no se mostraran los datos, toca tener el json-server prendido en otra terminal. Ahora, el loader siempre debe retornar algo, si no saca error, un error boundaries es un componente de react que obtiene los errores en cualquier lugar del componente.

export const obtenerClientes = async () => {
    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()
    return resultado
}


//al crear un nuevo cliente le damos al boton de crear y nos redirecciona a la pagina principal, y veremos este nuevo cliente, y si recargamos la api que hicimos en json-server aparecera este nuevo registro
export const agregarCliente = async (datos) => {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: "POST",
            body: JSON.stringify(datos),//convertimos los datos a json
            headers: {
                "Content-Type": "application/json"//le decimos que la aplicacion es de tipo json
            }
        })
        await respuesta.json()
    } catch (error) {
        console.log(error)
    }
}