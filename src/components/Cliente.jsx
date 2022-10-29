
const Cliente = ({ cliente }) => {
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
                <button type="button" className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs">Editar</button>
                <button type="button" className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">Eliminar</button>

            </td>
        </tr>
    )
}

export default Cliente
