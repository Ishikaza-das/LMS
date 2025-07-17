require('dotenv').config({ quiet: true });
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log('Failed to connect to DB',error);
});