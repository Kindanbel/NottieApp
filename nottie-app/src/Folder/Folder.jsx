import { useContext , useEffect } from "react";
import Folder from "../components/Folder";
import FolderApi from "../api/FolderApi";
import { NottieContext } from "../context/NottieContext.jsx";





function Folders(){

    const {folderArray, setFolderArray} = useContext(NottieContext)

    useEffect( () => {
        const fetchData = async ()=> {
            try {
                const response = await FolderApi.get("/")
                setFolderArray(response.data.data.folders)
               } catch(err){
                   console.log(err)
               }
        }

        fetchData();
    }, []);


    return(
        <div className=" pt-10">
            <div className="folders flex gap-x-5 justify-center lg:justify-start flex-wrap gap-y-5 ">
                {
                    folderArray.map((item, index)=>{
                       return <Folder
                        key={index}
                        id= {item.id}
                        folderName= {item.folder_name}
                        folderColor= {item.color_code}
                    />
                    })
                }
            </div>
        </div>
    )
}

export default Folders;