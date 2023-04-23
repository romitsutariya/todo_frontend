import { useState,useContext } from "react";
import axios from "axios";
import UserContext from "./UserContex";


function Login() {

    const user = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function loginUser(event) {
        event.preventDefault();
        const data = {email, password}
        console.log(data);
        axios.post("https://todo-backend-orcin.vercel.app/api/user/login", data)
            .then(response => {
                console.log(response.data)
                user.setEmail(response.data.email);
                localStorage.setItem("accessToken", response.data.token);
            })
            .catch(e => console.log(e.response.data));
    }

    return (
        <form action="" onSubmit={e=>loginUser(e)}>
            <p>
                <input value={email} type="email" name="email" placeholder="email" autoComplete="disabled"  onChange={e => setEmail(e.target.value)} />
            </p>
            <p>
                <input value={password} name="password" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
            </p>
            <p>
                <button type="submit">Login</button>
            </p>
        </form>
    )
}

export default Login;