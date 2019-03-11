import React, { Component } from "react";
import SignIn from "../component/auth/SignIn";
import SignUp from "../component/auth/SignUp";
import Layout from "../component/Panels/LayOut";
import firebase from "../config/firebaseConfig";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, clearUser } from "../store/actions";
import "../component/css/App.css";
import { Spinner } from "../helpers/spinner";

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push("/");
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
        <div>
          <Route exact path="/" component={Layout} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
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
