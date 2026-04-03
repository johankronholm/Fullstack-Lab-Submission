import { useRef } from "react";
import { useState } from "react";

type LoggedInProps = {
  setLoggedIn: Function;
};

function Login({ setLoggedIn }: LoggedInProps) {
  const [loginStatus, setLoginStatus] = useState("Enter forms below");
  const [toggleCreateUser, setToggleCreateUser] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newUsernameRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const login = async () => {
    const body = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    
    setLoggedIn(response.ok);
    {!response.ok && setLoginStatus("Invalid username/password!")} 
  };

  const register = async () => {
    const body = {
      username: newUsernameRef.current?.value,
      password: newPasswordRef.current?.value,
    };
    const response = await fetch("http://localhost:3000/api/user", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoggedIn(response.ok);
  };

  return (
    <div>
      <h2>Login</h2>
      <p>{loginStatus}</p>
      <input type="text" ref={usernameRef} defaultValue={"Username"} onClick={() => {if (usernameRef.current) { usernameRef.current.value = ""}}}></input>
      <input type="text" ref={passwordRef} defaultValue={"Password"} onClick={() => {if (passwordRef.current) { passwordRef.current.value = ""}}}></input>
      <button name="submit" onClick={login}>
        Login
      </button>
      <div onClick={() => setToggleCreateUser((prev) => !prev)}>
        ..or create a new user
      </div>

      {toggleCreateUser && (
        <div>
          <h3>Create a new user</h3>
          <input type="text" ref={newUsernameRef}></input>
          <input type="text" ref={newPasswordRef}></input>
          <button onClick={register}>Create user</button>
        </div>
      )}
    </div>
  );
}

export default Login;
