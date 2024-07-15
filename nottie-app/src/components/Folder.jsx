import { useContext, useState } from "react";
import { FaFolderClosed } from "react-icons/fa6";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import FolderApi from "../api/FolderApi";
import { NottieContext } from "../context/NottieContext.jsx";
import { useNavigate } from "react-router-dom";


function Folder(prop){

    const [isOpen, setIsOpen] = useState(false);

    //Using History hook to get the history url

    let history = useNavigate()
    

    const {folderArray, setFolderArray} = useContext(NottieContext)

    let id = prop.id

 
    const handleDelete = async (id) => {
        try {
            const response = await FolderApi.delete(`/${id}`)
            setFolderArray(folderArray.filter(item => {
               return item.id !== id
            }))
            console.log(response);
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = (id)=>{
        history(`/folder/${id}/updatefolder`)
    }

    const handleFolderSelect = (id) =>{
        history(`/folder/${id}`)
    }


    function handleOpen(){
        setIsOpen(!isOpen)
    }

    let date = new Date();
    let dateYear = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    return (
        <div>
            <div className=" relative container w-[350px] h-fit py-10 px-5 rounded-[12px] bg-black" style={{backgroundColor: prop.folderColor}}>
                <div className="icon flex items-center justify-between mb-7">
                <FaFolderClosed className="text-[50px] text-white cursor-pointer"/>
                <div className="dots">
                <PiDotsThreeOutlineFill onClick={handleOpen} className="text-white text-[20px] cursor-pointer"/>
                { isOpen && <ul className="cursor-pointer absolute right-5">
                    <li onClick={() => handleUpdate(id)} className="bg-white p-1 w-[100px] text-center">
                        Update
                    </li>
                    <li className="bg-red-600 p-1 mt-2 text-center text-white" onClick={()=> handleDelete(id)}>
                       Delete
                    </li>
                </ul>}
                </div>
                
                </div>
                <div className="folder-text flex flex-col gap-2">
                    <span onClick={() =>handleFolderSelect(id)}  className="header text-[25px] text-white font-[600] cursor-pointer">
                        {prop.folderName}
                    </span>
                    <span className="date text-[13px] text-white">
                        {day}/{month}/{dateYear}
                    </span>
                </div>
            </div>
        </div>
    )
}


export default Folder;