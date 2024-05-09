import React, { useState } from "react";

function Signup() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
      }),
    });

    const json = await response.json();

    if (!json.success) {
      alert("Signup failed. Please check your details and try again.");
    } else {
      alert("Signup successful!");
      
    }
  };

  return (
    <div className="singCont">
      <h3>Welcome to Activity tracker</h3>
      <p>Use your Signup credentials</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          id="name"
          value={credentials.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
