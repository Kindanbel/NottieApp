import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteApi from "../../api/NoteApi";
import { IoMdArrowBack } from "react-icons/io";

function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NoteApi(`/${id}`);
        setNote(response.data.data.notes.note_name);
        setContent(response.data.data.notes.note_content);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  //Use Navigate settings
  let navigate = useNavigate();

  const handleUpdateField = (id) => {
    navigate(`/note/${id}/updatenote`);
  };

  const handleBack = () => {
    navigate("/note")
}

  return (
    <div className="py-10 md:w-[70%]">
      <div
        onClick={handleBack}
        className=" md:hidden back flex gap-3 items-center mb-5"
      >
        <IoMdArrowBack className="text-[25px]" />
        <span className="text-[20px]">Back</span>
      </div>
      <div className="notename text-[30px] text-[500]">{note}</div>
      <div className="notecontent mt-10">
        <textarea
          rows="20"
          name="note_content"
          id="content"
          placeholder="Write Here"
          className="resize-none
               w-[100%] flex-1
               bg-transparent 
                outline-none text-[20px]"
          readOnly={true}
          value={content}
        />
      </div>
      <div className="button mt-10">
        <button
          onClick={() => handleUpdateField(id)}
          className="p-3 bg-white w-[250px] rounded-md"
        >
          Update Note
        </button>
      </div>
    </div>
  );
}

export default NoteDetails;
