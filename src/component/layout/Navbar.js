import React from 'react'
import { Link } from 'react-router-dom'
import LogIn from './LogIn'
import LogOut from './LogOut'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth } = props;
  console.log(auth);
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Capstone</Link>
        <LogIn />
        <LogOut />
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)