import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
    const auth = localStorage.getItem('user')
    const navigate = useNavigate();
    const LogoutUser = () => {
        localStorage.clear()
        navigate('/signup')
    }
    return (
        <div>
            <img className="pic" alt="logo" src="https://cdn4.vectorstock.com/i/1000x1000/78/53/eagle-logo-design-vector-28157853.jpg" />
            { auth? <ul className="nav-ul">
                <li><Link to="/">Product</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li> <Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={LogoutUser} to="/signup">Logout [{JSON.parse(auth).name}]</Link></li>
            </ul>
            :<ul className="style nav-ul">
                 <li><Link to="/signup">SignUp</Link></li>
                 <li><Link to="/login">Login</Link></li>
            </ul>
            }
        </div>
    )
}