
import React from "react";
import {Route , BrowserRouter , Switch} from "react-router-dom";
import { ContextProvider } from "./components/context";
import Login from "./components/login";
import Sat from "./components/admin";
import FacultyDash from "./components/facultyDash";
import UserDashboard from "./components/userDash";
import RegisterForm from "./components/registerationform";

function App() {
  return (
  <ContextProvider>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/admin" component={Sat}/>
      <Route path="/facultyLogged" component={FacultyDash}/>
      <Route path="/userLogged" component={UserDashboard}/>
      <Route path="/register" component={RegisterForm}/>
    </Switch>
    </BrowserRouter>
  </ContextProvider>
  );
}

export default App;
