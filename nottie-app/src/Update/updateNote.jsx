import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteApi from "../api/NoteApi";
import { useNavigate } from "react-router-dom";

function UpdateNote() {
  let { id } = useParams();
  const [note_name, setNoteName] = useState("");
  const [note_content, setNoteContent] = useState("");

  const handleNoteChange = (evt) => {
    const name = evt.target.value;
    setNoteName(name);
  };

  const handleNoteContentChange = (evt) => {
    const content = evt.target.value;
    setNoteContent(content);
  };

  //Navigation path

  let navigate = useNavigate();

  //Fetching Note data that was clicked
  useEffect(() => {
    const fetchData = async () => {
      const response = await NoteApi(`/${id}`);
      setNoteName(response.data.data.notes.note_name);
      setNoteContent(response.data.data.notes.note_content);
    };

    fetchData();
  }, []);

  //Updating the note on the Ui
  const handleNoteUpdate = async (evt) => {
    evt.preventDefault();
    try {
      const response = await NoteApi.patch(`/${id}`, {
        note_name,
        note_content,
      });
      navigate("/note");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10">
      <div className="header">
        <div className="folder"></div>
        <div className="header-text text-[40px]">Update Note</div>
      </div>

      <div className="form mt-10">
        <form>
          <div className="note_title">
            <input
              type="text"
              name="note_name"
              id="title"
              placeholder="Title"
              className="bg-nottieGray1 w-[100%] md:w-[70%] border-solid border-b-4 p-5 outline-none"
              onChange={handleNoteChange}
              value={note_name}
            />
          </div>
          <div className="note_content mt-5">
            <textarea
              rows="20"
              name="note_content"
              id="content"
              placeholder="Write Here"
              className="resize-none
                 w-[100%] md:w-[70%] flex-1
                bg-transparent 
                outline-none 
                border-b-4 border-solid p-5"
              onChange={handleNoteContentChange}
              value={note_content}
            />
          </div>
          <div className="button my-10">
            <button
              onClick={handleNoteUpdate}
              className="p-3 bg-white w-[250px] rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNote;
