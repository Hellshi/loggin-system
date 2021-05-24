import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Axios from 'axios'
import './App.css';
import Header from './components/layout/header'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Pages/Home';
import UserContext from './components/context/UserContext'

function App() {

  //Definindo o estado comum da aplicação para nenhum usúario está conectado
  const [userData, setUserData] = useState({
    token: undefined, 
    user: undefined,
  })

  //Checando se o Token é verdadeiro para dar acesso à alguma coisa
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/user/tokenIsValid",
        null,
        { headers: { "auth-token": token } }
      );
      if(tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/user/", {
          headers: { "auth-token": token },
        });
        setUserData({
          token: token, 
          user: userRes.data
        })
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
     <Router>
       <UserContext.Provider value={{userData, setUserData}} >
       <Header />
       <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/login" exact component={Login} />
         <Route path="/register" exact component={Register} />
       </Switch>
       </UserContext.Provider>
     </Router>
    </>
  );
}

export default App;
