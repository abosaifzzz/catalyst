import React from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
    return <>
        <div className="flex w-full flex-col min-h-screen">
            <Navbar />
            <div className="outlet w-5/6 mt-6 mx-auto ">
                <Outlet></Outlet>



            </div>
        </div>



    </>



}
