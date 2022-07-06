import logo from "./logo.svg";
import "./App.css";
import { useState, React } from "react";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const client = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
  });

  const tryLogin = async () => {
    try {
      await client.get("/sanctum/csrf-cookie");
      await client.post("/login", {
        email: "asep@mail.com",
        password: "asep12345",
      });
      const result = await client.get("/api/user");
      console.log(result.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  const reSentEmailVerification = async () => {
    try {
      await client.get("/sanctum/csrf-cookie");
      const result = await client.post("/email/verification-notification");
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {isLoggedIn ? (
          <p>Anda sudah login!</p>
        ) : (
          <button onClick={tryLogin}>Sign In</button>
        )}
        <button onClick={reSentEmailVerification}>
          Resend Email Verification
        </button>
      </header>
    </div>
  );
}

export default App;
