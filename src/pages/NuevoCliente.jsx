//el hook de useNavigate sirve para hacer que un boton nos redirija a otra pagina, en vez de utilizar links utilizamos este hook en un boton.Para usarlo lo importamos, creamos una const antes del return del componente y en el boton en un onClick lo usamos dentro de una funcion flecha y le pasamos la ruta a donde queremos que se redirija.Tambien se recomienda utilizar este hook en loaders. Ahora, en el formulario, la nueva version de react-router-dom ya no requiere hacer un handleSubmit para enviar el formulario, ahora se utiliza un componente llamado Form, este Form se le pasa el metodo post pues un formulario se utiliza para enviar datos, y en vez de una propiedad action, se crea una funcion parecida a un loader porque se exporta.Lo exportamos al main.jsx para que este componente luego lo pase nuevamente al componente de NuevoCliente, lo renombramos para que los nombres no choquen si hay mas de un formulario(igual que con el loader), en los children de nuestro componente NuevoCliente le pasamos la propiedad action y su valor sera esta funcion que importamos,asi el componente NuevoCliente ya sabra que tiene esa funcion y al dar submit la busca y la ejecuta. En si cuando quiero obtener datos utilizamos un loader y cuando quiero procesar un formulario utilizo un action(ambas son funciones) en react-router-dom 6.Ahora, siempre que utilizemos un action se presentara un request(solicitud) porque se esta enviando algo,asi que a esta funcion action se le pone como parametro {request}, si vemos en consola la informacion de este request veremos que tiene en su prototype un formData, aqui esta la informacion del formulario.Para verla ponemos nuestro action como async, y dentro usamos el await para ver el request.formData(). Ahora, si escribimos datos en el formulario, para capturarlos y pasarlos al servidor usamos el metodo la clase Object con el metodo fromEntries(), asi capturamos lo que enviemeos por el formulario.Tambien se podria hacer con un spreadOperator para hacer una copia de lo que tiene el formulario.Ya capturados los datos del formulario podemos hacer las validaciones respectivas.Hacemos un array para guardar los errores, y esos errores los retornamos, ahora,para pasarle esos errores al componente NuevoCliente debemos al igual que con los loader utilizar un hook llamado useActionData, y con este hook le asamos al componente los errores. Ya pasado el array de errores al componente lo podemos renderizar y asi mostrara errores si los hay, para los errores creamos un componente de Error, a este comonente le pasamos los children,para que capture los errores que tenga el array de errores.
import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { agregarCliente } from "../api/clientes"

//funcion tipo action  para el submit del formulario
export const action = async ({ request }) => {
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

    //si pasa la validacion se agrega un nuevo cliente
    await agregarCliente(datos)

    return redirect("/")//utilizamos redirect para los actions y loaders



}


const NuevoCliente = () => {

    const errores = useActionData()
    const navigate = useNavigate()

    // console.log(errores)
    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
            <p className="mt-3 font-black text-2xl text-blue-900">Llena todos los campos para registrar un nuevo cliente</p>

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
                    <Formulario />

                    <input type="submit" className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer" value="Registrar Cliente" />

                </Form>
            </div>
        </>
    )
}

export default NuevoCliente
