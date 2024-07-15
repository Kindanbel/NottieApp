import { useContext, useState } from "react";
import { NottieContext } from "../context/NottieContext";
import { useEffect } from "react";
import FolderApi from "../api/FolderApi";
import NoteApi from "../api/NoteApi";

function CreatNote(prop) {
  const { folderArray, setFolderArray } = useContext(NottieContext);

  const [note, setNote] = useState({
    note_name: "",
    note_content: "",
    color_code: "",
    folder_chosen: "",
  });

  function handleNoteChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const handleNoteClick = async (event) => {
    event.preventDefault();
    prop.onAddNote(note);

    try {
      const response = await NoteApi.post("/", {
        note_name: note.note_name,
        note_content: note.note_content,
        color_code: note.color_code,
        folder_chosen: note.folder_chosen,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setNote({
      note_name: "",
      note_content: "",
      color_code: "",
      folder_chosen: "",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FolderApi.get("/");
        setFolderArray(response.data.data.folders);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-10">
      <div className="header">
        <div className="header-text">
          <h1 className="text-[30px]">Create your new note</h1>
        </div>
      </div>

      {/*Form part */}
      <div className="form mt-10">
        <form>
          <div className="folder">
            {/*Select Folder part */}

            <div className="select">
              <div className="folder-text pb-3">Choose Your Folder:</div>
              <select
                onChange={handleNoteChange}
                name="folder_chosen"
                id="folders"
                className="w-[100%] md:w-[50%] py-2 outline-none"
              >
                <option value="Pick one now">Choose a folder</option>
                {folderArray.map((item, index) => {
                  return (
                    <option
                      name="folder_chosen"
                      value={item.folder_name}
                      key={index}
                    >
                      {item.folder_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/*Content part */}

          <div className="note mt-10">
            <div className="title mb-5">
              <input
                type="text"
                name="note_name"
                id="title"
                placeholder="Title"
                className="bg-nottieGray1 w-[100%] md:w-[70%] border-solid border-4 p-5 outline-none"
                onChange={handleNoteChange}
                value={note.note_name}
              />
            </div>
            <div className="content">
              <textarea
                rows="20"
                name="note_content"
                id="content"
                placeholder="Write Here"
                className="resize-none w-[100%]
                 md:w-[70%] flex-1
                bg-transparent 
                outline-none 
                border-4 border-solid p-5"
                onChange={handleNoteChange}
                value={note.note_content}
              />
            </div>
          </div>

          {/*Color part */}

          <div className="colorCheck mt-10">
            <div className="header-det flex flex-col mb-5">
              <span className="text-white text-[25px]">
                Choose Your Note Color
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
                  onChange={handleNoteChange}
                />
              </div>
              <div className="color1 flex items-center gap-5">
                <div className="w-[50px] h-[50px] bg-[#f39550] rounded-full"></div>
                <input
                  type="checkbox"
                  name="color_code"
                  id="color2"
                  value="#f39550"
                  onChange={handleNoteChange}
                />
              </div>
              <div className="color1 flex items-center gap-5">
                <div className="w-[50px] h-[50px] bg-[#9c9999] rounded-full"></div>
                <input
                  type="checkbox"
                  name="color_code"
                  id="color3"
                  value="#9c9999"
                  onChange={handleNoteChange}
                />
              </div>
            </div>
          </div>

          {/*Button part */}

          <div className="button my-10">
            <button
              onClick={handleNoteClick}
              className="p-3 bg-white w-[250px] rounded-md"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatNote;
