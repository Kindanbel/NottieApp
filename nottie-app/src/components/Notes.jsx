import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { PiTimer } from "react-icons/pi";
import { useState, useEffect } from "react";
import NoteApi from "../api/NoteApi";
import { useContext } from "react";
import { NottieContext } from "../context/NottieContext";
import { useNavigate } from "react-router-dom";

function Notes(prop) {
  let date = new Date();
  let dateYear = date.getFullYear();
  let dayDate = date.getDate();
  let month = date.getMonth() + 1;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[date.getDay()];

  const [isOpen, setIsOpen] = useState(false);

  //Getting note context
  const { noteArray, setNoteArray } = useContext(NottieContext);

  //Getting Id via note
  let id = prop.id;

  //Use Navigate settings
  let navigate = useNavigate();

  const handleUpdateField = (id) => {
    navigate(`/note/${id}/updatenote`);
  };

  //Setting Trauncated Note
  const charLimit = 200;
  const [truncatedContent, setTruncatedContent] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (prop.content) {
      setTruncatedContent(
        prop.content.length > charLimit
          ? prop.content.substring(0, charLimit) + "..."
          : prop.content
      );
    }
  }, [prop.content]);

  useEffect(() => {
    setTime(date.toLocaleTimeString());
  }, []);

  //Implementing Note Deleting

  const handleNoteDelete = async (id) => {
    try {
      const response = await NoteApi.delete(`/${id}`);
      setNoteArray(
        noteArray.filter((item) => {
          return item.id !== id;
        })
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Getting the Note details: Routing

  const handleNoteSelect = () => {
    navigate(`/note/${id}`);
  };

  return (
    <div>
      <div
        className="container bg-[#f59550] w-[350px] h-[400px] rounded-[12px] py-10 px-5"
        style={{ backgroundColor: prop.color }}
      >
        <div className="header flex flex-col gap-3 mb-5 border-b-[1px] border-black pb-3">
          <span className="folder text-end font-[500]">
            {prop.folder_chosen}
          </span>
          <span className="date text-[13px]">
            {dayDate}/{month}/{dateYear}
          </span>
          <div className="header-icon flex items-center justify-between">
            <span
              onClick={() => handleNoteSelect(id)}
              className="header-text text-[20px] font-[500] cursor-pointer"
            >
              {prop.title}
            </span>
            <span className="header-edit-icon relative">
              <BiSolidMessageSquareEdit
                onClick={() => setIsOpen(!isOpen)}
                className="text-[30px] cursor-pointer"
              />
              {isOpen && (
                <ul className="cursor-pointer absolute right-0 top-[20]">
                  <li
                    onClick={() => handleUpdateField(id)}
                    className="bg-white p-1 w-[100px] text-center"
                  >
                    Update
                  </li>
                  <li
                    onClick={() => handleNoteDelete(id)}
                    className="bg-red-600 p-1 mt-2 text-center text-white"
                  >
                    Delete
                  </li>
                </ul>
              )}
            </span>
          </div>
        </div>
        <div className="note-text">{truncatedContent}</div>
        <div className="time flex items-center gap-2 mt-5">
          <span className="time-icon">
            <PiTimer className="text-[20px] cursor-pointer" />
          </span>
          <span className="time-text text-[13px]">
            {time}, {day}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Notes;
