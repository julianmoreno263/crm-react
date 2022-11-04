import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../api/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"


//definimos un loader para poder capturar el id correspondiente al cliente especifico por medio de params, osea, los params capturan el id de la url(el parametro id) y asi podemos capturara ese cliente especifico por medio de su id. Luego importamos la funcion que captura un cliente por su id, esta funcion la definimos en la API(el archivo de clientes.js). Ahora, para que el formulario capture automaticamente los datos del cliente que se va a editar, usamos el un loader importando el useLoaderData. Luego creamos una const que sera igual a este useLoaderData y pasamos via props estos datos al comonente de Formulario.Ahora vamos al componente formulario y en cada input pasamos este prop con su correspondiente valor pero por medio de un defaultValue, porque como no hay un state como tal nos saldra un error si solo usamos el parametro value,entonces para evitar ese error usamos defaultValue.Recordar que en react-router-dom no usamos un state sino un action cuando damos submit al formulario, y en este action realizamos las validaciones.Ahora, si damos click en "nuevo cliente" nos sale un error, porque estamos tratando de llamar en el Formulario.jsx a {cliente.nombre} y puede que en ese momento el cliente exista o no, entonces para corregir esto utilizamos el optional Change (osea el simbolo ?) para validar si esos parametros están o no, y asi ya no sale error y nos muestra el formulario. 

//loader
export const loader = async ({ params }) => {
    const cliente = await obtenerCliente(params.clienteId)

    //validamos si el cliente no existe
    if (Object.values(cliente).length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "El cliente no existe"
        })
    }
    return cliente
}

//action para editar el cliente
export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const datos = Object.fromEntries(formData)

    // console.log([...formData])

    //capturara el email para validarlo
    const email = formData.get("email")

    //validacion del formulario
    const errores = []
    if (Object.values(datos).includes("")) {
        errores.push("Todos los campos son obligatorios")
    }

    //expresion regular para validar el email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errores.push("El email no es válido")
    }

    //retornar los errores
    if (Object.keys(errores).length) {
        return errores
    }

    //actualizar el cliente
    await actualizarCliente(params.clienteId, datos)


    return redirect("/")//utilizamos redirect para los actions y loaders
}



const EditarCliente = () => {
    const navigate = useNavigate()
    const cliente = useLoaderData()
    const errores = useActionData()

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3 font-black text-2xl text-blue-900">Puedes modificar los datos del cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate("/")}>
                    Volver
                </button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

                <Form
                    method="post"
                    noValidate //con esta propiedad deshabilitamos la validacion por defecto de html5
                >
                    {errores?.length && errores.map((error, index) => <Error key={index}>{error}</Error>)}
                    <Formulario
                        cliente={cliente}
                    />

                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer" value="Guardar Cambios" />

                </Form>
            </div>
        </>
    )
}

export default EditarCliente
