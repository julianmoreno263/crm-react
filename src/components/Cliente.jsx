import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from "../api/clientes"



//Para eliminar un cliente primero debemos rodear el boton de eliminar con un Form para poder realizar una accion, entonces importamos Form y rodeamos el boton con este from.El boton debe ser tipo submit y usaremos redirect.En el form ponemos el metodo post y el action nos crearemos  una nueva url para la eliminacion la cual indica el id del cliente a eliminar,generalmente al eliminar un cliente con el redirect indicamos que nos deje en la misma pagina de clientes,osea en "/",  en main.jsx debemos crear un nuevo child con esta nueva url de eliminar el cliente.Ya con esto creamos aqui el action pasando los params, porque en los params vendra el id que usaremos para eliminar un cliente especifico. En resumen, en cliente.js creamos la funcion para eliminar un cliente, esta funcion se utilizara en el componente Cliente.jsx por medio de un action, ese action sera llamado cuando se de click en el boton de eliminar y para que ese action funcione, se ejecuta en un Form el cual rodeara al boton de eliminar, aqui en ese Form se le indica al action la url (la cual tiene el id del cliente a eliminar) que tiene que usar.


//action 
export const action = async ({ params }) => {
    await eliminarCliente(params.clienteId)
    return redirect("/")
}


const Cliente = ({ cliente }) => {
    const navigate = useNavigate()
    const { nombre, telefono, email, empresa, id } = cliente

    return (
        <tr className="border-b space-y-2">
            <td className="p-6">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600"><span className="text-gray-800 font-bold uppercase">Email: </span>{email}</p>
                <p className="text-gray-600"><span className="text-gray-800 font-bold uppercase">Teléfono: </span>{telefono}</p>

            </td>

            <td className="p-6 flex gap-4">
                <button type="button" className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs" onClick={() => navigate(`/clientes/${id}/editar`)}>Editar</button>

                <Form
                    method="POST"
                    action={`/clientes/${id}/eliminar`}
                    onSubmit={e => {
                        if (!confirm("¿Deseas eliminar este cliente?")) {
                            e.preventDefault()
                        }
                    }}
                >
                    <button type="submit" className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">Eliminar</button>
                </Form>


            </td>
        </tr>
    )
}

export default Cliente
