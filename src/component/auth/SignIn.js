import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebaseConfig";

import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,

} from "semantic-ui-react";

export class SignIn extends Component {
    state = {
        currentUser: "",
        email: "",
        password: "",
        errors: [],
        loading: false
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleSubmit = e => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true });
            const { email, password, errors } = this.state;
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log("Login: signedInUser ", signedInUser);
                    this.setState({
                        currentUser: signedInUser,
                        loading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        errors: errors.concat(err),
                        loading: false
                    });
                });
        }
    };

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
            ? "error"
            : "";
    };

    render() {
        const { email, password, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="SignIn">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header textAlign="center">
                        <h1>Login to Capstone Project Portal</h1>
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input
                                className={this.handleInputError(errors, "email")}
                                fluid
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                onChange={this.handleChange}
                                value={email}
                                type="email"
                            />
                            <Form.Input
                                className={this.handleInputError(errors, "password")}
                                fluid
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={password}
                                type="password"
                            />

                            <Button
                                disabled={loading}
                                className={loading ? "loading" : ""}
                                color="blue"
                                fluid
                                size="large"
                            >
                                Submit
              </Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>
                        Don't have an account? <Link to="/signup">Register</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default SignIn