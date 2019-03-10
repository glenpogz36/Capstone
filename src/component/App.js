
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Dashboard from './dashboard/Dashboard'
import ProjectDetails from './project/ProjectDetails'
import SignIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import CreateProject from './project/CreatePoject'
import { connect } from "react-redux";
import { setUser, clearUser } from "../actions";
import "../css/app.css";
import Layout from "../components/Layout";
import { Spinner } from "../helpers/spinner";
import firebase from "../config/firebaseConfig";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/message");
      } else {
        this.props.history.push("/signin");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path="/message" component={Layout} />
              <Route path='/project/:id' component={ProjectDetails} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/createProject' component={CreateProject} />
            </Switch>
          </div>
        </BrowserRouter>

      );
  }
}

const mapStateToProps = state => ({
  isLoading: state.user.isLoading

});

export default connect(
  mapStateToProps,
  { setUser, clearUser }
)(withRouter(App));

