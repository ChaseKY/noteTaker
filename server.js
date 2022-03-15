// Import/require need packages

//1. Display the index.html with a route to / aka Root
const express = require('express');
const PORT = process.env.PORT | 3001;
const htmlRoutes = require('./routes/htmlRoutes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(htmlRoutes);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
