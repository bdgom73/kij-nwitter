import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService, auth} from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user)
    setIsLoggedIn(user !== null); 
  
  }, [])

  const login = () => setIsLoggedIn(true);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} login={login}/>
      <footer>
        &copy; Nwitter {new Date().getFullYear()}
      </footer>
    </>
  )
}

export default App;
