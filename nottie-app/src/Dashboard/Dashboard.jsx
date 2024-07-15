import { useContext } from "react";
import { Link } from "react-router-dom";
import { NottieContext } from "../context/NottieContext";
import { useEffect } from "react";
import NoteApi from "../api/NoteApi";
import FolderApi from "../api/FolderApi";
import Notes from "../components/Notes";
import Folder from "../components/Folder";
//import Folder from "../components/Folder";
//import Notes from "../components/Notes";

function Dashboard() {
  const { noteArray, setNoteArray } = useContext(NottieContext);
  const { folderArray, setFolderArray } = useContext(NottieContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await NoteApi.get("/");
      setNoteArray(response.data.data.notes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await FolderApi("/");
      setFolderArray(response.data.data.folders);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-20 pt-10 ">
      <div className="folders flex flex-col gap-10 ">
        <div className="header flex flex-col gap-5">
          <span className="header-text text-[25px]">Recent Folders</span>
          <span className="button-links flex gap-10">
            <button>Today</button>
            <button>This Week</button>
            <button>This Month</button>
          </span>
        </div>
        <div className="folder flex flex-col gap-5 md:gap-0 lg:flex-row items-center justify-between">
          <div className="folder-de flex gap-5 flex-col lg:flex-row ">
            {folderArray &&
              folderArray.slice(0, 3).map((folder, index) => {
                return (
                  <Folder
                    key={index}
                    id={folder.id}
                    folderName={folder.folder_name}
                    folderColor={folder.color_code}
                  />
                );
              })}
          </div>
          <div
            className="see-more w-[100%] h-20 md:w-40 md:h-32 
                    rounded-md border-dashed 
                    border-4 border-nottieBlack flex justify-center items-center"
          >
            <Link className="text-[15px]  md:text-[25px] text-center" to="/folder">
              Explore Folders
            </Link>
          </div>
        </div>
      </div>

      {/* Notes Area */}

      <div className="notes flex flex-col gap-10">
        <div className="header flex flex-col gap-5">
          <span className="header-text text-[25px]">My Notes</span>
          <span className="button-links flex gap-10">
            <button>Today</button>
            <button>This Week</button>
            <button>This Month</button>
          </span>
        </div>
        <div className="note flex items-center gap-5 md:gap-0 flex-col lg:flex-row justify-between">
          <div className="note-de flex gap-5 flex-col lg:flex-row">
            {noteArray &&
              noteArray.slice(0, 3).map((note, index) => {
                return (
                  <Notes
                    key={index}
                    id={note.id}
                    title={note.note_name}
                    content={note.note_content}
                    color={note.color_code}
                    folder_chosen={note.folder_chosen}
                  />
                );
              })}
          </div>
          <div
            className="see-more w-[100%] h-20 md:w-40 md:h-32 
            rounded-md border-dashed 
            border-4 border-nottieBlack flex justify-center items-center"
          >
            <Link className="text-[15px]  md:text-[25px] text-center" to="/note">
              Explore Notes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
