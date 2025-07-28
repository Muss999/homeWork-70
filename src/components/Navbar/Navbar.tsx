import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-secondary mb-3" data-bs-theme="dark">
            <div className="container d-f justify-content-between">
                <Link to={"/"} className="navbar-brand">
                    Contacts
                </Link>
                <Link to={"/contacts/add"} className="btn btn-light">
                    Add new contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
