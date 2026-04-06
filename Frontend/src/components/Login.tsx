import { useRef } from "react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "../types/user";

type LoggedInProps = {
  setUser: Dispatch<SetStateAction<User | null>>;
};

function Login({ setUser }: LoggedInProps) {
  const [loginStatus, setLoginStatus] = useState("Enter forms below");
  const [registerStatus, setRegisterStatus] = useState("Enter forms below");
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

    const data = await response.json();
    console.log(data);
    response.ok ? setUser(data.user) : setLoginStatus(data.message);
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
    const data = await response.json();
    console.log(data);
    response.ok ? setUser(data.user) : setRegisterStatus(data.message);
  };

  return (
    <div>
      <h2>Login</h2>
      <p>{loginStatus}</p>
      <input
        type="text"
        ref={usernameRef}
        defaultValue={"Username"}
        onClick={() => {
          if (usernameRef.current) {
            usernameRef.current.value = "";
          }
        }}
      ></input>
      <input
        type="text"
        ref={passwordRef}
        defaultValue={"Password"}
        onClick={() => {
          if (passwordRef.current) {
            passwordRef.current.value = "";
          }
        }}
      ></input>
      <button name="submit" onClick={login}>
        Login
      </button>
      <div onClick={() => setToggleCreateUser((prev) => !prev)}>
        ..or create a new user
      </div>

      {toggleCreateUser && (
        <div>
          <h3>Create a new user</h3>
          <p>{registerStatus}</p>
          <input
            type="text"
            ref={newUsernameRef}
            defaultValue={"Username"}
            onClick={() => {
              if (newUsernameRef.current) {
                newUsernameRef.current.value = "";
              }
            }}
          ></input>
          <input
            type="text"
            ref={newPasswordRef}
            defaultValue={"Password"}
            onClick={() => {
              if (newPasswordRef.current) {
                newPasswordRef.current.value = "";
              }
            }}
          ></input>
          <button onClick={register}>Create user</button>
        </div>
      )}
    </div>
  );
}

export default Login;
