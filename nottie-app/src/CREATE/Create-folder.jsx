import { useState } from "react";
import FolderApi from "../api/FolderApi";





function CreatFolder(prop){

    ["#ffcba5", "#f39550" , "#9c9999"]

   
    const [folder, setFolder] =useState({
        folder_name: "",
        color_code: ""
    });
   

    function handleFolderChange(event){
        const {name, value} = event.target;
        

        setFolder(prevFolder => {
            return {
                ...prevFolder,
                [name] : value
            }
        })     
    }


    const handleFolderClick = async (event) => {
        event.preventDefault();
        try {
           const response= await FolderApi.post("/", {
                folder_name: folder.folder_name,
                color_code: folder.color_code
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }

        prop.onAdd(folder)
        setFolder({
            folder_name: "",
            color_code: ""
        })
    }


 
    return (
        <div className="pt-10">
            <div className="header flex flex-col gap-5">
                <div className="large-text">
                    <h1 className="text-[30px] md:text-[50px]">
                        Create Your New Folder
                    </h1>
                </div>
                <div className="header-image">
                    <img src="/image/folder-illus.jpg" alt="folder" width={500} height={500} />
                </div>
            </div>

            {/*Form*/}

            <div className="form mt-10 p-5 md:p-20 bg-nottieBlack">
                <form>
                    <div className="folder-name flex flex-col gap-3">
                        <label htmlFor="Folder" className="text-[25px] md:text-[30px] text-white">Folder Name:</label>
                        <input type="text" name="folder_name" id="folder-name" placeholder="Enter Folder Name" 
                            className="w-[100%] md:w-[50%]
                            h-[50px] border-4 
                            border-solid
                             border-black 
                             outline-none
                            rounded-lg
                            p-5 text-[20px]"
                            value={folder.folder_name}
                            onChange={handleFolderChange}
                        />
                    </div>

                    <div className="colorCheck mt-10">
                        <div className="header-det flex flex-col mb-5">
                            <span className="text-white text-[25px] md:text-[30px]">
                                Choose Folder Color
                            </span>
                            <span className="text-white">
                                Click only one of the checkbox to choose your folder color
                            </span>
                        </div>
                        <div className="colorsColumn flex items-center gap-7">
                        <div className="color1 flex items-center gap-5">
                            <div className="w-[50px] h-[50px] bg-[#ffcba5] rounded-full"></div>
                            <input
                             type="checkbox" 
                             name="color_code" 
                             id="color1" 
                             value="#ffcba5" 
                             onChange={handleFolderChange}
                             />
                        </div>
                        <div className="color1 flex items-center gap-5">
                            <div className="w-[50px] h-[50px] bg-[#f39550] rounded-full"></div>
                            <input
                             type="checkbox" 
                             name="color_code" 
                             id="color2" 
                             value="#f39550" 
                             onChange={handleFolderChange}
                             />
                        </div>
                        <div className="color1 flex items-center gap-5">
                            <div className="w-[50px] h-[50px] bg-[#9c9999] rounded-full"></div>
                            <input
                             type="checkbox" 
                             name="color_code" 
                             id="color3" 
                             value="#9c9999" 
                             onChange={handleFolderChange}
                             />
                        </div>
                        </div>
                        
                    </div>

                    <div className="buttons mt-10">
                      <button onClick={handleFolderClick} type="submit" className="p-3 bg-white w-[250px] rounded-md">Add Folder</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatFolder;