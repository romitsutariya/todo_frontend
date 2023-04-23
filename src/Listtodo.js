import UserContext from "./UserContex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateTodo from "./CreateTodo";
function ListTodo() {
    const { email } = useContext(UserContext);
    const [todos, setTodo] = useState([]);



    const isDoneTodo = (index, id) => {
        //   todos.splice(index, 1)
        // setTodo([...todos]);
        const token = localStorage.getItem("accessToken");
        axios.delete("https://todo-backend-orcin.vercel.app/api/todo/" + index, {
            headers: {
                'x-access-token': token //the token is a variable which holds the token
            }
        }).then(response => {
            setTodo(response.data.todos)
        }).catch(e => console.log(e.response));
    }
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios.get("https://todo-backend-orcin.vercel.app/api/todo", {
            headers: {
                'x-access-token': token //the token is a variable which holds the token
            }
        }).then(response => {
            setTodo(response.data.todos)
        }).catch(e => console.log(e.response));
    }, []);

    return (<>
        <h1>Hello {!!email && email}, below are your todo items</h1>
        <CreateTodo setTodo={setTodo}></CreateTodo>
        <ol>
            {todos.map((todo, index) => {
                return (
                    <li key={index}>
                        {todo.item}
                        <button onClick={() => isDoneTodo(index, todo._id)}>Done</button>
                    </li>
                )
            })}
        </ol>
    </>
    )
}

export default ListTodo;