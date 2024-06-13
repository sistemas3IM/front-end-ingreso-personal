import { Outlet } from 'react-router-dom';
import { SideBar, SideBarItem } from '../components/SideBar';
import { MdDashboard, MdDevices } from 'react-icons/md';
import { SiGoogleforms } from 'react-icons/si';
import { TbReportSearch } from 'react-icons/tb';
import Badge from 'flowbite-react'

const DefaultLayout = () => {



    return (
        <main className='flex'>
            <SideBar>
                <SideBarItem icon={<MdDashboard size={20} />} text={'Dashboard'} />
                <SideBarItem icon={<SiGoogleforms size={20} />} text={'Solicitud de ingreso'} active />
                <SideBarItem icon={<MdDevices size={20} />} text={'Equipos'} />
                <SideBarItem icon={<TbReportSearch size={20} />} text={'Reportes'} />
            </SideBar>
            <div className='flex-1 bg-neutral-300'>
                <div className='mt-5 px-3'>
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default DefaultLayout