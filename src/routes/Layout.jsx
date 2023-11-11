import { Outlet, Link } from "react-router-dom";

const Layout = () => {
   return (
    <div className="layout">
     <div className="navbar">
        <h1>Productivity Club ⏰</h1>

        <input type="text" id="searchBar" className="searchArea" placeholder="Search For Posts"/>
        
        <div className="navLinks"> 
           <Link to="/"> Home </Link>
           <a> | </a>
           <Link to="/create"> Create New Post </Link>
        </div>

     </div>
     
     <Outlet />

    </div>
   )
}

export default Layout;