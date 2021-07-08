import React, { useContext } from 'react';
import AuthContext from './store/auth-context';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {

  const authCtx = useContext(AuthContext);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  //The below will result in an infinite loop
  // const localLoginInfo = localStorage.getItem("isLoggedIn");
  // if(localLoginInfo === "1"){
  //   setIsLoggedIn(true);
  // }

  //instead make use of useEffect()
  // useEffect( ()=>{
  //   const localLoginInfo = localStorage.getItem("isLoggedIn");
  //   if(localLoginInfo === "1"){
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("isLoggedIn", "1");  // This is alright, executes once when login happens.
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  return (
      <React.Fragment>
        <MainHeader/>
        <main>
          {!authCtx.isLoggedIn && <Login/>}
          {authCtx.isLoggedIn && <Home/>}
        </main>
      </React.Fragment>
  );
}

export default App;
