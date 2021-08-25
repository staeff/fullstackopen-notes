import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  // pass array of notes to useState to
  // initialize the piece of state stored in notes
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  // function to create new notes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      // receives content from the components newNote state
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5, // 50% chance that a note is marked important
      id: notes.length + 1,
    }

    // Added to the list of notes using the array method concat
    // to create a copy and not mutate the original object
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  // Use a ternary expression to decide whether notes should be filtered
  // filtering is done by the filter method of array
  const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input type="text"
               value={newNote}
               onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
