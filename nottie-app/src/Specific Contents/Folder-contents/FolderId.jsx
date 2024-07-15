import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FolderApi from "../../api/FolderApi";
import { useContext } from "react";
import { NottieContext } from "../../context/NottieContext";
import NoteApi from "../../api/NoteApi";
import Notes from "../../components/Notes";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

function FolderId() {
  const { id } = useParams();
  const [folderName, setFolderName] = useState("");

  const { noteArray, setNoteArray } = useContext(NottieContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FolderApi.get(`/${id}`);
        setFolderName(response.data.data.folder.folder_name);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NoteApi.get("/");
        setNoteArray(response.data.data.notes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  let navigate = useNavigate();

  const handleBack = () => {
      navigate("/folder")
  }

  return (
    <div>
      <div
        onClick={handleBack}
        className=" md:hidden back flex gap-3 items-center"
      >
        <IoMdArrowBack className="text-[25px]" />
        <span className="text-[20px]">Back</span>
      </div>
      <div className="header">
        <div className="folderName py-10 text-[500] text-[35px]">
          {folderName}
        </div>
      </div>

      <div className="notes flex flex-wrap gap-x-5 gag-y-5">
        {noteArray.map((note, index) => {
          if (folderName === note.folder_chosen) {
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
          }
        })}
      </div>
    </div>
  );
}

export default FolderId;
