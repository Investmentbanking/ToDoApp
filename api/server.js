const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


const Todo = require('./models/Todo');

// list out our todos
// app.get() creates a get route, req = request & res = response
// if we make a request to local host 3001/todos, it will find our
// to dos. Will find it using our model which connected to mongoose
// db & will find all of the todo's we need then will pass back to
// file
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    // stores out to dos here
    res.json(todos);
})

app.post('/todo/new', (req, res) =>{
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

app.listen(3001, () => console.log("Server started on port 3001"));
