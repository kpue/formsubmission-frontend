import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const baseURL = import.meta.env.VITE_apiURL;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");
  const [apiData, setApiData] = useState({});
  const [notification, setNotification] = useState(null);

  // Fetch API data
  useEffect(() => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      setNotification("Passwords must match");
      return;
    }
    const info = {
      name: fullName,
      email: email,
      password: password1,
      occupation: occupation,
      state: state,
    };
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((response) => {
        if (response.status === 200) {
          setNotification("Submission sucessful");
          event.target.reset();
        } else {
          setNotification("Submission failed");
        }
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex-container">
      <div>{notification}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            autoFocus
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            name="password1"
            id="password1"
            required
            onChange={(event) => setPassword1(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password2"
            required
            onChange={(event) => setPassword2(event.target.value)}
          />
          {password2 && !(password1 === password2) && (
            <label>Passwords not equal</label>
          )}
        </div>
        <div>
          <label htmlFor="occupations">Occupation</label>
          <select
            name="occupations"
            id="occupations"
            required
            onChange={(event) => setOccupation(event.target.value)}
          >
            <option value=""></option>
            {apiData.occupations &&
              apiData.occupations.map((occupation) => (
                <option key={occupation} value={occupation}>
                  {occupation}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="states">State</label>
          <select
            name="states"
            id="states"
            required
            onChange={(event) => setState(event.target.value)}
          >
            <option value=""></option>
            {apiData.states &&
              apiData.states.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name} ({state.abbreviation})
                </option>
              ))}
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
