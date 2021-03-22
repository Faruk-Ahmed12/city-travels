import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
import "./Login.css";
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const Login = () => {
  const [userInfo, setUserInfo] = useState({
    isSignIn: false,
    email: "",
    password: "",
  });

  const [oldUser, setOldUser] = useState(false);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: location };

  const [logedInUser, setloggedInUser] = useContext(UserContext);
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { displayName, email };
        setloggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  };

  const handlefbsignIn = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbprovider)
      .then((result) => {
        const user = result.user;
        const { displayName, email } = result.user;
        const signedInUser = { displayName, email };
        setloggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
  };
  //
  const handleChange = (e) => {
    let userData = { ...userInfo };
    userData[e.target.name] = e.target.value;
    setUserInfo(userData);
  };

  const handaleSubmit = (e) => {
    if (!oldUser && userInfo.email && userInfo.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(userInfo.email, userInfo.password)
        .then((res) => {
          setloggedInUser(res.user);
          history.replace(from);
          console.log("User Sign Successfuly");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
    e.preventDefault();
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <Form onSubmit={handaleSubmit}>
              <h2>LOGIN</h2>
              <br />
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  onChange={handleChange}
                  type="password"
                  placeholder="Password"
                  required
                  name="password"
                />
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <div className="forgot">
                <Link to="/forgotpassword">Forgot Password</Link>
              </div>
              <br />
              <input type="submit" className="loginBtn" value="LOGIN" /> <br />
              <div className="dontaccount">
                <span>Dont't have an account?</span>{" "}
                <Link to="/registration">Create an account</Link>
              </div>
            </Form>
            <div className="orBtn">
              <span>Or</span>
            </div>
            <div className="socialLink text-center">
              <Button onClick={handlefbsignIn}>
                <span>
                  {" "}
                  <i class="fab fa-facebook-f"></i>{" "}
                </span>
              </Button>
              <Button onClick={handleGoogleSignIn}>
                <span>
                  {" "}
                  <i class="fab fa-google"></i>{" "}
                </span>
              </Button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
