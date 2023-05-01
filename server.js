const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); uuidv4();
const path = require('path');
const { readAndAppend, writeToFile, readFromFile } = require('./Develop/helpers/fsUtils');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
  res.json(dbJson);
});

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'Develop/db/db.json', 'UTF8'))
);

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
);

app.post('/api/notes', (req, res) => {

    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
      readAndAppend(newNote, './Develop/db/db.json');
      res.json(`Note successfully added`);
    } else {
      res.error('Error');
    }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);