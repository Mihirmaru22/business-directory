const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/add-business', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'addBusiness.html'));
});

app.post('/api/businesses', (req, res) => {
  const { name, details, varieties } = req.body;
  if (!name || !details || !varieties) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newBusiness = { name, details, varieties };

  const filePath = path.join(__dirname, 'data', 'businesses.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    const businesses = data ? JSON.parse(data) : [];
    businesses.push(newBusiness);

    fs.writeFile(filePath, JSON.stringify(businesses, null, 2), err => {
      if (err) {
        console.error('Error saving business:', err);
        return res.status(500).json({ error: 'Failed to save business.' });
      }
      res.status(201).json({ message: 'Business added successfully.' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});