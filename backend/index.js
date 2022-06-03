const express = require('express');
const dotenv = require('dotenv');

const app = express();
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();

connectDB();
app.use(express.json());

// const notes = require('./data/notes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const PORT =  process.env.PORT;

app.get('/', (req, res) => {
    // console.log(process.env.PORT);
    res.send('Welcome to Local host 5000')
})

// app.get('/api/notes', (req, res) => {
//     res.json(notes);
// })

// app.get("/api/notes/:id", (req, res) => {
//     const note = notes.find((no) => no._id === req.params.id)
//     res.send(note);
// });

app.use('/api/users', userRoutes);
app.use("/api/notes", noteRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log('Welcome to Port 5000'));