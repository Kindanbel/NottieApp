import { useContext } from 'react';
import Notes from '../components/Notes'
import { NottieContext } from '../context/NottieContext';
import { useEffect } from 'react';
import NoteApi from '../api/NoteApi';


function NoteContainer(){

    const {noteArray, setNoteArray} = useContext(NottieContext);

    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response = await NoteApi.get("/")
                setNoteArray(response.data.data.notes)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData();
    }, [])
    
    return(
        <div>
        <div className="pt-10">
            <div className="notes flex gap-x-5 justify-center lg:justify-start flex-wrap gap-y-5">
                {
                    noteArray.map((note, index) => {
                        return (
                            <Notes
                                key={index}
                                id={note.id}
                                title={note.note_name}
                                content={note.note_content}
                                color={note.color_code}
                                folder_chosen={note.folder_chosen}
                            />
                        )
                    })
                }
            </div>
        </div>
     </div>
    )
}

export default NoteContainer;