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
      try {
        const parsedUser = JSON.parse(localUser);
        if (parsedUser?._id) {
          setUser(parsedUser);
          console.log("Local user loaded!");
        } else {
          localStorage.removeItem("localUser");
          console.log("Invalid local user removed!");
        }
      } catch {
        localStorage.removeItem("localUser");
        console.log("Corrupted local user removed!");
      }
    } else {
      console.log("No local user found!");
    }
  };

  const saveLocalUser = (user: User) => {
    if (!user?._id) {
      console.log("Invalid user was not saved!");
      return;
    }

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
      <footer>
        <p>© 2026 Johan - All right reserved.</p>
      </footer>
    </>
  );
}
export default App;

//Fix: Script to start backend and frontend concurrently 
//Add: 
