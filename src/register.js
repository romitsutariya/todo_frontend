import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContex";
function Register() {

    const user=useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    function registerUser(event) {
        event.preventDefault();
        const data = {
            email, password, firstname, lastname
        }
        console.log(data);
        axios.post("https://todo-backend-orcin.vercel.app/api/user/register", data)
            .then(response => {
                user.setEmail(response.data.email);
                localStorage.setItem("accessToken", response.data.token);
            })
            .catch(e => console.log(e.response.data));         
    }

    return (
        <form action="" onSubmit={e => registerUser(e)}>
            <p><input
                value={email}
                type="email"
                name="email"
                placeholder="email"
                autoComplete="disabled"
                onChange={e => setEmail(e.target.value)}
            /></p>
            <p><input
                value={password}
                type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            /></p>
            <p> <input
                value={firstname}
                type="text"
                name='first_name'
                placeholder="firstname"
                autoComplete="disabled"
                onChange={e => setFirstname(e.target.value)}
            /></p>
            <p> <input
                value={lastname}
                type="text"
                name='last_name'
                placeholder="lasttname"
                autoComplete="disabled"
                onChange={e => setLastname(e.target.value)}
            /></p>
            <p> <button type="submit">Submit</button></p>
        </form>
    )
}

export default Register;