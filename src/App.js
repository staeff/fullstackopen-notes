import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  // pass array of notes to useState to
  // initialize the piece of state stored in notes
  const [notes, setNodes] = useState(props.notes)


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App
