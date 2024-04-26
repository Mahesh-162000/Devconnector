const express = require('express');
const connectDB = require('./src/config/db');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());


// Connect DataBase
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/auth', require('./src/routes/api/auth'));
app.use('/api/profile', require('./src/routes/api/profile'));
app.use('/api/posts', require('./src/routes/api/posts'));

// Serve static assets in production
if (process.env.NOVE_ENV === 'production') {
    //Set static Folder
    app.use(express.static('client-side/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client-side', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));