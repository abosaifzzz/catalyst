import React, { useState } from 'react'
import prog from "../../assets/prog.jpg"
import Sidebar from '../Sidebar/Sidebar.jsx';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return <>

    <div className="dashboard-layout flex">
      <Sidebar isSidebarVisible={isSidebarVisible}  setSidebarVisible={setSidebarVisible} toggleSidebar={toggleSidebar} />

      <div className={`content w-full ${isSidebarVisible ? "ms-[320px]" : ""}   min-h-screen`}>
        <div className="outlet py-4 px-14">
          <Outlet />

        </div>

      </div>


    </div>


  </>
}
