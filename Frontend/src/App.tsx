import Login from "./components/Login";
import { useState } from "react";
import Home from "./components/Home";
import { useEffect } from "react";
import type { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const clearLocalUser = () => {
    if (localStorage.getItem("localUser")) {
      localStorage.removeItem("localUser");
    }
    setUser(null);
    console.log("Cleared local user!");
  };

  const loadLocalUser = () => {
    const localUser = localStorage.getItem("localUser");
    if (localUser) {
      setUser(JSON.parse(localUser));
      console.log("Local user loaded!");
    } else {
      console.log("No local user found!");
    }
  };

  const saveLocalUser = (user: User) => {
    localStorage.setItem("localUser", JSON.stringify(user));
    setUser(user);
    console.log("Local user saved!");
  };

  useEffect(() => {
    loadLocalUser();
  }, []);

  return (
    <>
      <header>
        <h1>RunTracker</h1>
      </header>
      {user && <Home clearLocalUser={clearLocalUser} user={user} />}
      {!user && <Login saveLocalUser={saveLocalUser} />}
     
    </>
  );
}
export default App;
