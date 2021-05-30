import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import CreateAuction from "./components/createAuction";
import MyAuctions from "./components/myAuctions";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create" component={CreateAuction} />
        <Route path="/myauctions" component={MyAuctions} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
