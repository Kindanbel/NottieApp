import './App.css'
import Sidebar from './Sidebar/Sidebar'
import Header from './components/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Folders from './Folder/Folder'
import NoteContainer from './Note/NoteContainer'
import Profile from './Profile/Profile'
import CreatFolder from './CREATE/Create-folder'
import CreatNote from './CREATE/Create-note'
import { useState } from 'react'
import { NottieContextProvider } from './context/NottieContext.jsx'
import UpdateFolder from './Update/updateFolder.jsx'
import FolderId from './Specific Contents/Folder-contents/FolderId.jsx'
import UpdateNote from './Update/updateNote.jsx'
import NoteDetails from './Specific Contents/Note-contents/Notedetails.jsx'
import SidebarMobile from './Sidebar/Sidebar-mobile.jsx'



function App() {

  const [folders, setFolders] = useState([])

  const [notes, setNotes] = useState([]);

  function addFolder(newFolder){
    setFolders(prevFolders => {
      return [...prevFolders, newFolder]
    })
  }

  function onAddNote(newNote){
    setNotes(prevNotes => {
      return [...prevNotes, newNote]
    })
  }


  return (
    <>
    <NottieContextProvider>
    <BrowserRouter>
    <div className='md:flex h-screen'>
        <Sidebar/>
        
      <div className="Homepage p-3 md:p-7 flex-1 h-screen bg-nottieGray1 overflow-scroll">
        <div className="head sticky top-0 z-10">
        <Header/>
        </div>
        <Routes>
          <Route path='/' element={<Dashboard folderArray={folders} noteArray={notes}/>}/>
          <Route path='/folder' element={<Folders folderArray={folders}/>}/>
          <Route path='/folder/:id' element={<FolderId />}/>
          <Route path='/note/:id' element={<NoteDetails />}/>
          <Route path='/note' element={<NoteContainer noteArray={notes}/>}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/createfolder' element={<CreatFolder 
            onAdd={addFolder}
          />}/>
          <Route path='/folder/:id/updatefolder' element={<UpdateFolder/>}/>
          <Route path='/note/:id/updatenote' element={<UpdateNote/>}/>
          <Route path='/createnote' element={<CreatNote folderArray={folders} onAddNote={onAddNote}/>}/>
        </Routes>
      </div>
      <SidebarMobile/>
    </div>
    </BrowserRouter>
    </NottieContextProvider>
    </>
  )
}

export default App
