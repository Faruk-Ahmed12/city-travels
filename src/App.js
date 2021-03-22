import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../src/Components/Home/Home.css";
import "./App.css";
import Blog from "./Components/Blog/Blog";
import Contact from "./Components/Contact/Contact";
import Destination from "./Components/Destination/Destination";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Registration from "./Components/Registration/Registration";
export const UserContext = createContext();
function App() {
  const [logedInUser, setloggedInUser] = useState({});
  return (
    <div>
      <UserContext.Provider value={[logedInUser, setloggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <PrivateRoute path="/destination/:name">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/blog">
              <Blog></Blog>
            </Route>
            <Route path="/contact">
              <Contact></Contact>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/registration">
              <Registration></Registration>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
