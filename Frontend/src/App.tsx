import Login from "./components/Login";
import { useState } from "react";
import Home from "./components/Home";
import type { User } from "./types/user";

function App() {

  const [user, setUser] = useState<User | null>(null); 

  return <>
  {user && <Home user={user}/>}
  {!user && (
  <Login setUser={setUser}/>)}
  </>
}
export default App;


//Fix: Corrected request status messages:
//Add: Post route for runs and request validation 
//Add: Get route for runs
//Add: Fetch runs on client side ??