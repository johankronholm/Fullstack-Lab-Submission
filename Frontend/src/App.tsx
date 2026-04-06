import Login from "./components/Login";
import { useState } from "react";
import Home from "./components/Home";
import type { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {user && <Home user={user} />}
      {!user && <Login setUser={setUser} />}
    </>
  );
}
export default App;

//Add: PUT route for runs, update runs on client side. DELETE route for runs, delete runs on client side.
//Fix: Try/catch and polished input validation for DB processing
