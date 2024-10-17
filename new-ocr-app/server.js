const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Serve static files (HTML, JS, CSS)
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html');
})

// Route to handle file upload and send it to the Python script
app.post('/upload', upload.single('image'), async (req, res) => {
    const imagePath = path.join(__dirname, 'uploads', req.file.filename);

    try {
        // Send image to the Python server via Axios
        const response = await axios.post('http://localhost:5000/ocr', {
            imagePath: imagePath
        });

        // Send the result back to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error in OCR:', error);
        res.status(500).json({ error: 'Error processing the image.' });
    } finally {
        // Remove the image after processing
        fs.unlinkSync(imagePath);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
