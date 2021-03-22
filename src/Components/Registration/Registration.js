import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [newUser] = useState(false);
  const [user, setUser] = useState({
    isCreated: false,
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const handleChange = (e) => {
    let isfieldValid = true;
    if (e.target.name === "email") {
      isfieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isfieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isfieldValid) {
      const users = { ...user };
      users[e.target.name] = e.target.value;
      setUser(users);
    }
  };

  const handleSubmit = (e) => {
    if (!newUser && user.email && user.password && user.name) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const registerUser = { ...user };
          registerUser.isCreated = true;
          registerUser.error = "";
          setUser(registerUser);
          userName(user.name);
        })
        .catch((error) => {
          const registerUser = { ...user };
          registerUser.isCreated = false;
          registerUser.error = error.message;
          setUser(registerUser);
        });
    }
    e.preventDefault();
  };

  const userName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("update successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <Form>
              <div className="errorMessege">
                <span className="errormain"> {user.error}</span>
                <strong>
                  {user.isCreated && (
                    <span>Your account successfully created</span>
                  )}
                </strong>
              </div>
              <h2>Create an account</h2>
              <div className="from-group">
                <input
                  className="form-control"
                  name="name"
                  onBlur={handleChange}
                  type="text"
                  required
                  placeholder="Name"
                />
              </div>
              <br />
              <div className="from-group">
                <input
                  className="form-control"
                  name="email"
                  onBlur={handleChange}
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <br />
              <div className="from-group">
                <input
                  className="form-control"
                  name="password"
                  onBlur={handleChange}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div className="from-group">
                <input
                  className="form-control"
                  name="password"
                  onBlur={handleChange}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <br />
              <div className="registrations">
                <input
                  type="submit"
                  onClick={handleSubmit}
                  className="loginBtn"
                  value="Create an account"
                />
              </div>{" "}
              <div className="dontaccount">
                <span>Already have an account?</span>{" "}
                <Link to="/login">Login</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
