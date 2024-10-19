import { useState } from "react";
import { useAccountContext } from "../../context";
import { Base as Layout } from "@/layouts";
import "./Login.style.scss";

function Login() {
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAccountContext();

  const attemptLogin = async () => {
    console.log(username, password)
    try {
      const message = await login(username, password);
      setMessage(message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <Layout>
      <div className="Login">
        <div className="Login__panel">
          <div className="Login__panel__content">
            <img src="/carleton_logo_black.png"></img>
            <div className="Login__panel__content__message">
              <div>Welcome to the Carleton SSO Federated Portal.</div>
              <div>
                Enter your{" "}
                <a href="https://myone.carleton.ca" target="blank">
                  MyCarletonOne
                </a>{" "}
                username and password.
              </div>
            </div>
            {message && <p>{message}</p>}
            <div className="Login__panel__content__input">
              <input type="text" placeholder="MyCarletonOne username" onChange={handleUsernameChange}></input>
              <input type="password" placeholder="Password" onChange={handlePasswordChange}></input>
            </div>
            <div className="Login__panel__content__checkbox">
              <input type="checkbox"></input>
              <label>Keep me signed in</label>
            </div>
            <div className="SignInBlock">
              {/* <div className="SignInAnimation"> */}
              <button
                className="Login__panel__button"
                id="signInButton"
                onClick={() => attemptLogin()}
              >
                Sign In
              </button>
              {/* </div> */}
              <div className="SignInAnimation">
                <img id="gorillaBob" src="gorillaBob.png" alt="Gorilla Bob"></img>
              </div>
            </div>
          </div>
        </div></div>
    </Layout>
  );
}

export default Login;
