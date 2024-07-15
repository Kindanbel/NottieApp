import {Link} from "react-router-dom";
import { MdInsertChartOutlined } from "react-icons/md";
import { FaFolderClosed } from "react-icons/fa6";
import { MdNoteAlt } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiNotebookBold } from "react-icons/pi";
import { HiFolderPlus } from "react-icons/hi2";

const navLinks = [
    {
        icon: <MdInsertChartOutlined />,
        link: "DB",
        href: "/"
    },{
        icon: <FaFolderClosed />,
        link: "FO",
        href: "/folder"
    },{
        icon:<HiFolderPlus />,
        link: "CF",
        href: "/createfolder"
    },{
        icon: <PiNotebookBold />,
        link: "NT",
        href: "/note"
    },{
        icon: <MdNoteAlt />,
        link: "CN",
        href: "/createnote"
    },{
        icon: <CgProfile />,
        link: "PF",
        href: "/profile"
    }

]

function SidebarMobile(){
  

    return (
    <div className={`MobileSidebar md:hidden bg-nottieBlack text-white sticky bottom-[0px] h-[100px]`}>
         <nav className="">
            <ul className="links pt-5 flex px-5 justify-center items-center">
                {navLinks.map((links,index)=>{
                    return (
                        <li key={index}
                        className= {`hover:bg-nottieLightWhite mb-3 rounded-md `}>
                            <Link to={links.href} className="flex flex-col items-center  cursor-pointer pt-2 px-4">
                                <div className="text-[25px]">
                                {links.icon}
                                </div>
                                <div className={` origin-left duration-200`}>
                                {links.link}
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
         </nav>
      </div>
    )
}

export default SidebarMobile;