const notes = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/api/notes', (req, res) => {
  return readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'Note saved successfully.',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Note failed to save.');
  }
});

notes.delete('/api/notes/:id', (req, res) => {
  const deleteNote = req.params.id;
  readFromFile('./db/db.json').then((data) => {
    let parsedData = JSON.parse(data);
    const result = parsedData.filter((note) => note.id !== deleteNote);
    writeToFile('./db/db.json', result);
  });
});

module.exports = notes;
