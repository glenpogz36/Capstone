import React, { Component } from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Layout from "../Components/Panels/Layout";
import firebase from "../Config/firebase";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, clearUser } from "../Actions";
import "./CSS/App.css";
import { Spinner } from "../Components/Spinner";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
      } else {
        this.props.history.push("/login");
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner />
    ) : (
      <div>
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
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
