import React from 'react'
import { Link } from 'react-router-dom';
export default function Sidebar() {
    return (
        <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><div class="nav-link text-secondary"><h5>DashBoard</h5></div></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="#"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Overview</span></a></li>
                {/* <li class="nav-item mb-2">
                    <a class="nav-link text-secondary" href="#submenu1" data-toggle="collapse" data-target="#submenu1"><i class="far fa-file-word font-weight-bold"></i> <span className="ml-3"> Reports</span></a>
                    <ul class="list-unstyled flex-column pl-3 collapse" id="submenu1" aria-expanded="false">
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""><i class="fas fa-book-reader"></i> Data Report </a></li>
                       <li class="nav-item mb-2 "><a class="nav-link text-secondary" href=""> <i class="fas fa-book-medical"></i> File Report </a></li>
                    </ul>
                </li> */}
                <li class="nav-item mb-2"><div class="nav-link text-secondary" ><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"><Link to="/reports">Reports</Link></span></div></li>
                <li class="nav-item mb-2"><div class="nav-link text-secondary" ><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"><Link to="/analytics">Analytics</Link></span></div></li>
                <li class="nav-item mb-2"><div class="nav-link text-secondary" ><i class="far fa-chart-bar font-weight-bold"></i> <span className="ml-3"><Link to="/addbooks">Add Book</Link></span></div></li>
            </ul>
        </div>
    )
}
