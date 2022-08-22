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

    // stores to dos here
    res.json(todos);
})

// creates new to dos
app.post('/todo/new', (req, res) =>{
    const todo = new Todo({
        text: req.body.text
    });

    // saves the to do to our collection
    todo.save();

    // passes back our new to do so we can add to our list
    res.json(todo);
});

// deletes a post
app.delete('/todo/delete/:id', async (req, res) =>{
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) =>{
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(3001, () => console.log("Server started on port 3001"));
