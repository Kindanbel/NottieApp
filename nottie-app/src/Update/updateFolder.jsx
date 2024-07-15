import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderApi from "../api/FolderApi";


function UpdateFolder(){
    const {id} = useParams();
    let navigate = useNavigate();
    const [folder_name, setFolderName] = useState("")
    console.log(id);

    const handleUpdateChange = (evt) =>{
        const name = evt.target.value

        setFolderName(name)
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await FolderApi.get(`/${id}`)
            console.log(response.data.data)
            setFolderName(response.data.data.folder.folder_name)
        }

        fetchData();
    }, [])

    const handleUpdate = async (evt) =>{
        evt.preventDefault();
        try {
            const response = await FolderApi.put(`/${id}`, {
                folder_name
            })
            navigate("/folder")
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }




    return(
        <div className="pt-10">
            <div className="header">
                <div className="header-text text-[25px] md:text-[40px]">
                    Update Folder-Name Now
                </div>
            </div>
            <form >
                <div className="form-group flex flex-col mt-5 mb-20">
                    <div className="input">
                        <input type="text" name="folder_name" id="folder" value={folder_name}
                        onChange={handleUpdateChange}
                         className="p-5 w-[100%] md:w-[50%] bg-transparent border-4 border-solid"
                         />
                    </div>
                    <div className="button mt-10">               
                        <button onClick={handleUpdate} className="p-3 bg-white w-[250px] rounded-md" type="submit">Update Now</button>
                    </div>
                </div>
            </form>
            <div className="header-image">
                    <img src="/image/folder-illus.jpg" alt="folder-image" />
                </div>
        </div>
    )
}

export default UpdateFolder;