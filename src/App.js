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
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  // useEffect takes two parameters, first a function (the effect itself)
  // the second parameter is used to specify how often the effect is run
  // [] = the effect is only run along with the first render of the component
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  // function to create new notes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      // receives content from the components newNote state
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5, // 50% chance that a note is marked important
      // id: notes.length + 1, noteObject is posted to REST Server and ids a better
      // created on the server side
    }

    //
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)
        // Added to the list of notes using the array method concat
        // to create a copy and not mutate the original object
        setNotes(notes.concat(noteObject))
        setNewNote('')
      })
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
