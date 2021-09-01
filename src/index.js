import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import App from './App';


const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

// json-server is running on port 3001 (npx json-server -p3001 --watch db.json)

// The get method of axios returns a promise

// promise is fullfilled eventually because /notes exists
const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

// promise is rejected eventually because /foobar not exists
const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

ReactDOM.render(
  <App notes={notes} />,
  document.getElementById('root')
)
