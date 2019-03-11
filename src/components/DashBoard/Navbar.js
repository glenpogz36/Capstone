import React from 'react'
import { Link } from 'react-router-dom'
import LogIn from '../Auth/Login'
import Register from '../Auth/Register'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    //   console.log(auth);
    const links = auth.uid ? <LogIn profile={profile} /> : <Register />
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="left">Capstone</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)