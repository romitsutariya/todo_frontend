import {
  BrowserRouter,
  Link,
  Route,
  Routes

} from 'react-router-dom';
import Register from './register';
import Login from './loginUser';
import UserContext from './UserContex';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ListTodo from './Listtodo'

function App() {

  const logout = () => {
    localStorage.removeItem('accessToken');
    setEmail(null)
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios.get("https://todo-backend-orcin.vercel.app/api/todo", {
      headers: {
        'x-access-token': token //the token is a variable which holds the token
      }
    }).then(response => {
      setEmail(response.data.email)
    }).catch(e => console.log(e.response));
  }, []);

  const [email, setEmail] = useState("");
  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <div>
          {!!email && (<div>Welcome {email} <button onClick={logout}>Logout</button></div>)}
          {!email && (<div>Please login</div>)}
        </div>
        <hr />

        <div>
          <Link to={''}> Home</Link>|
          <Link to={'/login'}>Login</Link> |
          <Link to={'/register'}>Register</Link>
        </div>

        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<ListTodo />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
