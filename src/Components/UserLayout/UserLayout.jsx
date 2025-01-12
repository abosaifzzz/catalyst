import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return <>
        <div className="flex w-full flex-col min-h-screen">
            <Navbar />
            <div className="outlet   ">
                <Outlet></Outlet>



            </div>
        </div>



    </>



}
