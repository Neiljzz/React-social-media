import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, logUserOut }) {
    // console.log(props);
    // console.log(typeof props);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Neil's Social Media</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/">Home</Link>
                        {user ? (
                            <>
                            <Link className="nav-link" to="/create">Create A Post</Link>
                            </>
                        ) : (
                            <>
                            <Link className="nav-link" to="/register">Sign Up</Link>
                            <Link className="nav-link" to="/login">Log In</Link>
                            </>
                        )}
                    </div>
                
                </div>
                <div className="d-flex">
                    {user ? (
                        <>
                        <div className="btn btn-light">{user.username}</div>
                        <Link className="btn btn-outline-success" to="/" onClick={() => logUserOut()}>Log Out</Link>
                        </>
                    ): (<></>)}
                </div>
            </div>
        </nav>
    )
}
