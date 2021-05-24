import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom'; 
import UserContext from '../context/UserContext'
import Axios from 'axios'


export default function Register() {

    const { setUserData } = useContext(UserContext)
    const History = useHistory();

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const submit = async (e) => {
        e.preventDefault();
        const newUser = {name, password, email}
        const RegisterRes = await Axios.post(
            'http://localhost:5000/user/register',
             newUser
            )

        const loginRes = await Axios.post(
            'http://localhost:5000/user/login',{
                email, 
                password
            })

        setUserData({
            token: loginRes.data.token, 
            user: loginRes.data.user
        })
        localStorage.setItem('auth-token', loginRes.data.user); 
        History.push('/')
    }

    return (
        <div className="Page">

            <h2>Register</h2>
            <form onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input 
                    type="email" 
                    id="register-email"
                    onChange={(e) => {setEmail(e.target.value)}}
                    /> <br/>

                <label htmlFor="register-name">Name</label>
                <input 
                    type="text" 
                    id="register-name"
                    onChange={(e) => {setName(e.target.value)}}
                    /> <br/>

                <label htmlFor="register-password">Password</label>
                <input 
                    type="password" 
                    id="register-password"
                    onChange={(e) => {setPassword(e.target.value)}}
                    /> <br/>

                <input type="submit" value="Register"/>
            </form>
            
        </div>
    )
}

