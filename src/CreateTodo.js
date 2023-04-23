import { useState } from "react";
import axios from "axios";
function CreateTodo({setTodo}) {
    const [item, setItem] = useState('');



    const addTdod = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        axios.post("https://todo-backend-orcin.vercel.app/api/todo/" ,{item,done:false},{
            headers: {
                'x-access-token': token //the token is a variable which holds the token
            }
        }).then(response => {
            setTodo([...response.data.todos])
            setItem("");
        }).catch(e => console.log(e.response));
    }
    return (
    <>
       <form action="" onSubmit={e=>addTdod(e)}>
            <p>
                <input value={item} type="text" name="todo" placeholder="Add Item" autoComplete="disabled"  onChange={e => setItem(e.target.value)} required />
                <button type="submit">Create</button>
            </p>
        </form>  
    </>
    )
}

export default CreateTodo;