import React from 'react';
import { SideBar, SideBarItem } from './SideBar';
import { MdDashboard, MdDevices } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";

const DefaultLayout = () => {


    return (
        <main className='flex'>
            <SideBar>
                <SideBarItem icon={<MdDashboard size={20} />} text={'Dashboard'} active/>
                <SideBarItem icon={<SiGoogleforms size={20} />} text={'Solicitud de ingreso'} />
                <SideBarItem icon={<MdDevices size={20} />} text={'Equipos'} />
                <SideBarItem icon={<TbReportSearch size={20} />} text={'Reportes'} />
            </SideBar>
            <div className='flex-1 bg-neutral-300'>
                <div className='mt-5 px-3'>
                    <h1 className='text-3xl font-medium  text-neutral-900 p-4'>Dashboard</h1>
                </div>
            </div>
        </main>
    )
}

export default DefaultLayout