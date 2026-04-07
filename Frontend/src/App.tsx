import Login from "./components/Login";
import { useState } from "react";
import Home from "./components/Home";
import type { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {user && <Home setUser={setUser} user={user} />}
      {!user && <Login setUser={setUser} />}
    </>
  );
}
export default App;

//Add: Pagination
//Add: Personal Best collection, updates personal best when adding/editing run in 3000ms interval. 
//Fix: Input validation on client side 
//Fix: Only store seconds in db for record comparison
//Fix: Minutes and seconds conversion on client side
