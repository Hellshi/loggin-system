import { useState, useContext } from 'react'; 
import { useHistory } from 'react-router-dom'; 
import UserContext from '../context/UserContext'
import Axios from 'axios'


export default function Login() {

    const { setUserData } = useContext(UserContext)
    const History = useHistory();

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const login = async (e) => {
        e.preventDefault();

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
        <>
            <form onSubmit={login}>
               <label htmlFor="input-email">Email</label>
               <input 
               type="email" 
               id="input-email"
                onChange={(e) => {setEmail(e.target.value)}}

               /> <br/>

               <label htmlFor="password-input">Password</label>
               <input 
               type="password" 
               id="pasword-input"
               onChange={(e) => {setPassword(e.target.value)}}
               /> <br/>

               <input type="submit" value="Entrar"/>
            </form>
        </>
    )
}
