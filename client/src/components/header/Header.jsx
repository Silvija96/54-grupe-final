import { Link } from "react-router";
import { MenuLink } from "./MenuLink";

export function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src="#" alt="Logo" />
                    </a>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <MenuLink to='/'>Home</MenuLink>
                    <MenuLink to='/movies'>Movies</MenuLink>
                    <MenuLink to='/categories'>Categories</MenuLink>
                </ul>
                <div className="col-md-3 text-end">
                    <Link to='/register' className="btn btn-primary me-2">Register</Link>
                    <Link to='/login' className="btn btn-outline-primary">Login</Link>
                </div>
            </header>
        </div>
    );
}