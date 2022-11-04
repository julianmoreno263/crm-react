import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from './components/Layout'
import Index, { loader as clientesLoader } from './pages/Index'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import { ErrorPages } from "./components/ErrorPages"
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from './pages/EditarCliente'
import { action as eliminarClienteAction } from "./components/Cliente"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPages />
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPages />
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPages />

      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction
      }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
