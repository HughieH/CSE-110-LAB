import React, { useState } from 'react';
import { ThemeContext, themes } from "./themeContext";
import { Label, Note } from './types/types';
import { dummyNotesList } from './constants/dummyNotesList';
import './App.css';

function App() {
  
  const [likedList, setLikedList] = useState([false, false, false, false, false, false]);
  const toggleLike = (index: number) => {
    const newLikedList = [...likedList]
    newLikedList[index] = !likedList[index]
    setLikedList(newLikedList);
  };

  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const [notes, setNotes] = useState(dummyNotesList); 
  
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState(initialNote);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: likedList.length + 1 };
    setNotes([...notes, newNote])
    setLikedList([...likedList, false])
    setCreateNote(initialNote);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);

    // Update the likedList by removing the liked status for the deleted note
    const updatedLikedList = [...likedList];
    updatedLikedList.splice(id - 1, 1); // Remove the liked status for the corresponding note
  
    // Update the state with the filtered notes and updated likedList
    setNotes(updatedNotes);
    setLikedList(updatedLikedList);
  }

  return (

    <ThemeContext.Provider value={currentTheme}>
      
      <div
        style={{
          background: currentTheme.background,
          padding: "20px",
        }}
      >
      
      <button onClick={toggleTheme}> Toggle Theme </button>
      
      <div className='app-container'>
      
      <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={createNote.title}
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required>
            </input>
          </div>

          <div>
            <textarea
              value={createNote.content}
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required>
            </textarea>
          </div>

      <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

    	<div><button type="submit">Create Note</button></div>
  	</form>
      
        <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            contentEditable="true"
          >
            <div className="notes-header">
              <button className={`heart-button ${likedList[note.id - 1] ? 'liked' : ''}`} onClick={() => toggleLike(note.id - 1)}> ♥ </button>
              <button onClick={() => deleteNote(note.id)}> x </button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
        </div>

        <div>
            <h2> List of Favourites: </h2>
            <ul>
              {likedList.map((liked, index) =>
                liked ? <li key={index}> Test note {index + 1} </li> : null
              )}
            </ul>
        </div>
    </div>
    </div>
   </ThemeContext.Provider>
  );
}

export default App;
