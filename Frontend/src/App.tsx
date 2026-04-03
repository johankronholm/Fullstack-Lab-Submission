import Login from "./components/login";
import { useState } from "react";
import Home from "./components/Home";

function App() {

  const [loggedIn, setLoggedIn] = useState(false); 

  return <>
  {loggedIn && <Home/>}
  {!loggedIn && (
  <Login setLoggedIn={setLoggedIn}/>)}
  </>
}
export default App;
