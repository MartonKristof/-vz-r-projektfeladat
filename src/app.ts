import express from 'express';
import { json } from 'body-parser';
import { someMiddleware } from './middleware/someMiddleware'; // Example middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(json());
app.use(someMiddleware);

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});