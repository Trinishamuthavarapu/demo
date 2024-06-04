// Import Express.js and MongoDB libraries
const express = require('express'); // npm install express
const { MongoClient } = require('mongodb'); // npm install mongodb
const cors = require('cors');
// Create an Express application
const app = express();
app.use(cors({ origin: '*' }));
// Use Express's built-in JSON middleware
app.use(express.json());

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}.');
});

// MongoDB connection URI
const MONGODB_URI = 'mongodb+srv://2211cs010397:Pv6zcdGEz8nCRJVs@cluster1.jjlhh4e.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster1'; // Adjust to your MongoDB URI

// Default Route (for testing)
app.get('/', (req, res) => {
    res.send('<h1>Hi</h1>');
});

// Route to fetch records from MongoDB
app.get('/movies', async (req, res) => {
    try {
        const client = await MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true });
        const db = client.db();
        const collection = db.collection('movies');

        // Fetch one record
        const record = await collection.find({}).toArray();
       
        client.close();

        res.json(record);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Internal Server Error');
    }
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error("Error middleware:", err);
    res.status(500).send('Something went wrong!');
});