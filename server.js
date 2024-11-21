// Import dependencies
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Created "uploads" directory.');
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: uploadDir, // Save uploaded files in the 'uploads' folder
    filename: (req, file, cb) => {
        // Save files with a timestamp to avoid collisions
        const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Initialize multer with storage configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limit files to 100MB
    },
    fileFilter: (req, file, cb) => {
        // Accept only video files
        const allowedExtensions = ['.mp4', '.avi', '.mkv', '.mov'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed.'));
        }
    }
});

// Middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Route to handle file upload
app.post('/upload', upload.single('videoFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('<h2>Error: No file uploaded.</h2>');
    }

    const uploadedFilePath = req.file.path;

    // Placeholder for AI processing
    console.log(`File uploaded: ${uploadedFilePath}`);
    // Here, you can call your AI model or processing logic
    const mockSummary = "This is a mock summary of your video.";

    // Send a response with file details and the AI summary
    res.send(`
        <h2>File uploaded successfully!</h2>
        <p>File saved at: ${uploadedFilePath}</p>
        <h3>Video Summary:</h3>
        <p>${mockSummary}</p>
        <a href="/">Go back</a>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`<h2>Server Error:</h2><p>${err.message}</p>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
