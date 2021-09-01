import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  // An example of an effect hook
  // a call to a state-updating function (setNotes) triggers the re-rendering
  // of the component
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

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
        : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
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
