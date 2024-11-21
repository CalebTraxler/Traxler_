// cd C:\Users\caleb\source\repos\ai-life-analyzer\public
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: 'uploads/', // Folder to save uploaded files
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
    }
});
const upload = multer({ storage: storage });

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to handle file upload from the form
app.post('/upload', upload.single('videoFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Placeholder response for successful upload
    res.send(`<h2>File uploaded successfully!</h2><p>Path: ${req.file.path}</p>`);
    // Here, you can add code to process the file with your AI model
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});