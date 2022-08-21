// importing functions from a external library
// useState- store and set variables
// useEffect- update variables when actions happen 
import { useState, useEffect } from 'react'; 

const API_BASE = "http://localhost:3001";

function App() {
    // setters, getters and default values 
    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    // () = anonymous function (without a name/parameters)
    // run when action taken 
    // [] = runs anon function one time
    useEffect(() => {
        GetTodos();

        console.log(todos);
    }, [])

    // anon function called GetTodos
    // fetch takes each of {} data from response
    // adds to GetTodos variable 
    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err));
    }

	return (
		<div className="App">
            <h1> Welcome to the To List App </h1>
            <h4> Your Tasks </h4>

            <div className = "todos">
                {todos.map(todo => (
                    <div className = {
                        "todo " + (todo.complete ? "is-complete" : "")
                        } key={todo._id}>
                        <div className = "checkbox"></div>

                        <div className = "text">{todo.text}</div>

                        <div className = "delete-todo">x</div>   
                    </div>    
                ))}
		    </div>
        </div>
	);
}

export default App;
