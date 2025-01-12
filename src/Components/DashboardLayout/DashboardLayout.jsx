import React, { useState } from 'react'
import prog from "../../assets/prog.jpg"
import Sidebar from '../Sidebar/Sidebar.jsx';
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return <>

    <div className="dashboard-layout flex">
      <Sidebar isSidebarVisible={isSidebarVisible} setSidebarVisible={setSidebarVisible} toggleSidebar={toggleSidebar} />

      <div className={`content w-full ${isSidebarVisible ? "ms-[320px]" : ""}   min-h-screen`}>
        <div className="navigate-to-client fixed bottom-3 right-3">
          <Link to={"/"}>
            <button className="bg-sky-600 text-white px-3 py-1 rounded-md">CLient Side</button>
          </Link>


        </div>
        <div className="outlet py-4 px-14">
          <Outlet />

        </div>

      </div>


    </div>


  </>
}
