import React from 'react';
import { SideBar, SideBarItem } from './SideBar';
import { MdDashboard, MdDevices } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";

const DefaultLayout = () => {
    return (
        <main className='App'>
            <SideBar>
                <SideBarItem icon={<MdDashboard size={20} />} text={'Dashboard'} />
                <SideBarItem icon={<SiGoogleforms size={20} />} text={'Solicitud de ingreso'} />
                <SideBarItem icon={<MdDevices size={20} />} text={'Equipos'} active/>
                <SideBarItem icon={<TbReportSearch size={20} />} text={'Reportes'} alert/>
            </SideBar>
        </main>
    )
}

export default DefaultLayout