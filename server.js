const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable All CORS Requests for external sites
app.use(cors());

// Serve static images from the 'imgs' directory
app.use('/images', express.static(path.join(__dirname, 'imgs')));

app.get('/', (req, res) => {
    res.send('VetosX Images Host is running. Access images at /images/<filename>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
