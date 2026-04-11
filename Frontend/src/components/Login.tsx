import { useRef } from "react";
import { useState } from "react";
import "../styles/login.css";

type LoggedInProps = {
  saveLocalUser: Function;
};

function Login({ saveLocalUser }: LoggedInProps) {
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(
    "Please enter your desired username and password.",
  );
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
    response.ok ? saveLocalUser(data.user) : setLoginStatus(data.message);
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
    response.ok ? saveLocalUser(data.user) : setRegisterStatus(data.message);
    console.log(data);
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        {!toggleCreateUser && (
          <>
            <h2>Welcome</h2>
            {loginStatus && <p className="status">{loginStatus}</p>}
            <div className="form">
            <input
              type="text"
              className="prim-field"
              ref={usernameRef}
              placeholder="Username"
              onClick={() => {
                if (usernameRef.current) {
                  usernameRef.current.value = "";
                }
              }}
            ></input>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              className="prim-field"
              onClick={() => {
                if (passwordRef.current) {
                  passwordRef.current.value = "";
                }
              }}
            ></input>
            <button className="prim-button" name="submit" onClick={login}>
              Log in
            </button>
            <button
              className="link"
              onClick={() => setToggleCreateUser((prev) => !prev)}
            >
              Register
            </button>
            </div>
          </>
        )}

        {toggleCreateUser && (
          <>
            <h2>Register</h2>
            <p className="status">{registerStatus}</p>
            <div className="form">
            <input
              type="text"
              className="prim-field"
              ref={newUsernameRef}
              placeholder={"Username"}
              onClick={() => {
                if (newUsernameRef.current) {
                  newUsernameRef.current.value = "";
                }
              }}
            ></input>
            <input
              type="text"
              className="prim-field"
              ref={newPasswordRef}
              placeholder={"Password"}
              onClick={() => {
                if (newPasswordRef.current) {
                  newPasswordRef.current.value = "";
                }
              }}
            ></input>
            <button className="prim-button" onClick={register}>
              Create user
            </button>
            <button
              className="link"
              onClick={() => setToggleCreateUser((prev) => !prev)}
            >
              Return to login
            </button>
            </div>
          </>
        )}
      </div>
      
    </div>
  );
}

export default Login;
