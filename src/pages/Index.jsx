import { useLoaderData } from "react-router-dom"
import { obtenerClientes } from "../api/clientes"
import Cliente from "../components/Cliente";
//en react-router-dom no se utiliza el useEffect, se utiliza la funcion loader(), esta funcion nos servira para poder cargar el listado de clientes que se vera en esta pagina, es similar al useEffect, nos sirve para cargar el resultado de la consulta a una API en un componente o agregarle state, esta funcion se exporta hacia el main.jsx, esta funcion siempre debe retornar algo. En el main lo puedo renombrar con as para que si tengo varios loader no choquen los nombres.Despues de exportarlo hacia main, se lo paso al componente Index en este caso en sus childrens.Asi ya aqui en el componente Index ya puedo ver este loader y su informacion.En si el loader es como el state del componente, y para acceder a la informacion que tenga el loader usamos el hook useLoaderData.Lo utilizo dentro del componente Index y este hook leera la informacion que tenga la funcion loader.
export const loader = () => {

    const clientes = obtenerClientes()//esta es la funcion de la api que obtiene los cientes

    return clientes
}





const Index = () => {

    //aqui utilizo el hook useLoaderData para leer el loader
    const clientes = useLoaderData()


    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
            <p className="mt-3 font-black text-2xl text-blue-900">Administra tus clientes</p>

            {clientes.length ? (
                <table className="w-full bg-white shadow mt-5 table-auto">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Cliente</th>
                            <th className="p-2">Contacto</th>
                            <th className="p-2">Acciones</th>

                        </tr>
                    </thead>

                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente
                                cliente={cliente}
                                key={cliente.id}
                            />
                        ))}

                    </tbody>

                </table>
            ) : (
                <p className="text-center mt-10">No hay Clientes</p>
            )}
        </>
    )
}

export default Index
