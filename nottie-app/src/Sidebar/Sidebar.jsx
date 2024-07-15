import { useState } from "react";
import {Link} from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { GiSecretBook } from "react-icons/gi";
import { MdInsertChartOutlined } from "react-icons/md";
import { FaFolderClosed } from "react-icons/fa6";
import { MdNoteAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiNotebookBold } from "react-icons/pi";
import { HiFolderPlus } from "react-icons/hi2";

const navLinks = [
    {
        icon: <MdInsertChartOutlined />,
        link: "Dashboard",
        href: "/"
    },{
        icon: <FaFolderClosed />,
        link: "Folders",
        href: "/folder"
    },{
        icon:<HiFolderPlus />,
        link: "Create-Folder",
        href: "/createfolder"
    },{
        icon: <PiNotebookBold />,
        link: "Notes",
        href: "/note"
    },{
        icon: <MdNoteAlt />,
        link: "Create-Note",
        href: "/createnote"
    },{
        icon: <CgProfile />,
        link: "Profile",
        href: "/profile"
    }

]

function Sidebar(){
    const [isOpen, setIsOpen] = useState(true)

    function handleOpen(){
        setIsOpen(!isOpen)
    }

    return (
    <div className={`Sidebar p-5 pt-8 ${isOpen ? "w-72" : "w-20" } bg-nottieBlack text-white h-screen duration-300 relative`}>
        <IoIosArrowDropright onClick={handleOpen} className={`text-[30px] 
        absolute 
        -right-4 top-3 text-nottieBlack
        cursor-pointer
         bg-white rounded-full ${isOpen && "rotate-180"} duration-300`}/>

         
         <nav className="">
            <div className="logo text-white flex items-center gap-x-4 ">
                <div>
                <GiSecretBook className={`text-[50px] text-nottieOrange duration-500`}/>
                </div>
                <h1 className={`text-[30px] origin-left duration-300 ${!isOpen && "scale-0"}`}>
                    NOTTIE
                    </h1>
            </div >
            <ul className="links pt-10">
                {navLinks.map((links,index)=>{
                    return (
                        <li key={index}
                        className= {`hover:bg-nottieLightWhite mb-3 rounded-md `}>
                            <Link to={links.href} className="flex items-center gap-4 cursor-pointer p-2">
                                <div className="text-[25px]">
                                {links.icon}
                                </div>
                                <div className={`${!isOpen && "hidden"} origin-left duration-200`}>
                                {links.link}
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
         </nav>

         <div className={`mt-20 ${!isOpen && "hidden"}`}>
            <img src="/image/girlwrite2.jpg" width={250} height={250} className="rounded-md"/>
         </div>
      </div>
    )
}


export default Sidebar;