import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-dark mb-3">
            <div class="flex-row d-flex">
                <button type="button" class="navbar-toggler mr-2 " data-toggle="offcanvas" title="Toggle responsive left sidebar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <Link class="navbar-brand" to="/dashboard#" title="Free Bootstrap 4 Admin Template">Dashboard</Link>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="collapsingNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/home">Home</Link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to="/alert" data-toggle="collapse"><h6>Alert</h6></Link>
                    </li>
                    <li class="nav-item" >
                        <Link class="nav-link" to="/about" data-target="#myModal" data-toggle="modal"><h6>About</h6></Link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#myAlert" data-toggle="collapse">  </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
