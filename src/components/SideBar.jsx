import React, { createContext, useState, useContext } from 'react';
import SidebarLogo from '../images/ingreso-personal.png';
import { TiThMenu } from "react-icons/ti";
import { AiOutlineUser } from 'react-icons/ai';
import { IoMdMore, IoIosClose } from 'react-icons/io';

const SideBarContext = createContext();

const SideBar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className='h-screen'>
      <nav className='h-full inline-flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <img src={SidebarLogo}
            className={`overflow-hidden transition-all duration-300 ${expanded ? 'w-40' : 'w-0'}`}
            alt="sidebar-logo" />
          <button
            onClick={() => setExpanded(curr => !curr)}
            className='p-1.5 rounded-lg hover:bg-gray-100'>
            {expanded ? <IoIosClose size={25}/> : <TiThMenu size={25} />}
          </button>
        </div>

        <SideBarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SideBarContext.Provider>

        <div className='border-t flex p-3'>
          <AiOutlineUser size={30} className='rounded-md text-blue-950' />
          {true && (<div className={`w-2 h-2 rounded bg-green-500`}></div>)}
          <div className={`
            flex justify-between items-center
            overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}>
            <div className='leading-4'>
              <h4 className='font-semibold text-blue-950'>Usuario</h4>
              <span className='text-xs text-blue-950'>email@im.com.sv</span>
            </div>
            <IoMdMore size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
};

const SideBarItem = ({ icon, text, active, alert }) => {
  const { expanded } = useContext(SideBarContext);
  return (
    <li className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? 'bg-zinc-300 text-blue-950 font-bold' : 'text-blue-950 hover:bg-zinc-200'}
        `}>

      {icon}

      <span className={`
        overflow-hidden transition-all duration-300 ${expanded ? 'w-52 ml-3' : 'w-0 hidden'}
        `}>
        {text}
      </span>

      {alert && (<div className={`absolute right-2 w-2 h-2 rounded bg-red-500 ${expanded ? '' : 'top-2'}`}></div>)}

      {!expanded && (<div className={`absolute left-full rounded-md px-2 py-1 ml-6
            bg-zinc-300 text-blue-950 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}>{text}</div>)}
    </li>
  )
};

export { SideBar, SideBarItem };