const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates a new to do schema and passes objects 
// with a bunch of different elements 
const TodoSchema = new Schema({ 
    text :{ // text element 
        type: String, // passes string object
        required: true // check if required or not
    },
    complete: { // complete element 
        type: Boolean, 
        // when you first create a to do or store
        // a to do in a schema sets complete value
        // to false unless you specify otherwise
        default: false // default is false
    },
    timestamp: { // timestamp element 
        type: String,
        // gets the current time string and store it inside
        // of that. Whenever you make a new to do it will
        // store the current time 
        default: Date.now()
    }
})

// this is where you create the model
const Todo = mongoose.model("Todo", TodoSchema);
// import this model and use it inside of our application in server.js
module.exports = Todo;