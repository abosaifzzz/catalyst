import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserLayout from './Components/UserLayout/UserLayout.jsx'
import Properties from './Pages/Properties/Properties.jsx'
import PropertyDetails from './Pages/PropertyDetails/PropertyDetails.jsx'
import DashboardLayout from './Components/DashboardLayout/DashboardLayout.jsx'
import Users from './Pages/Users/Users.jsx'
import AdminProperties from './Pages/AdminProperties/AdminProperties.jsx'
import Bookings from './Pages/Bookings/Bookings.jsx'

function App() {
  let routers = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <Properties /> },
        { path: "property-details/:id", element: <PropertyDetails /> },


      ],
    },
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Users /> },
        { path: "properties", element: <AdminProperties /> },

        { path: "bookings", element: <Bookings /> },

      ],
    },
  ])
  return (
    <>
      <RouterProvider router={routers} />    </>
  )
}

export default App
