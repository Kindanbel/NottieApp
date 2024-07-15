import {useState, createContext} from 'react';

export const NottieContext = createContext();

export const NottieContextProvider = (prop) => {

    const [folderArray, setFolderArray] = useState([])

    const [noteArray, setNoteArray] = useState([])


    return <NottieContext.Provider value={{folderArray, setFolderArray, noteArray, setNoteArray}}>
        {prop.children}
    </NottieContext.Provider>
}











































