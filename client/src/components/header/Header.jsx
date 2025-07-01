import { Link } from "react-router";
import { MenuLink } from "./MenuLink";
import { mainMenuData } from "../../data/mainMenuData";
import heroImg from '../../assets/movies-hero.png';
import { useContext } from "react";
import { UserContext } from "../../context/user/UserContext";

export function Header({ isPublicPage }) {
    const { isLoggedIn, logout } = useContext(UserContext);

    function handleLogoutClick() {
        fetch('http://localhost:5417/api/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    logout();
                }
            })
            .catch(console.error);
    }

    return (
        <div className={isPublicPage ? 'container' : 'container-fluid'}>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                        <img src={heroImg} alt="Logo" style={{ height: '3rem' }} />
                    </a>
                </div>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {mainMenuData.map(link => <MenuLink key={link.text} to={link.href}>{link.text}</MenuLink>)}
                </ul>
                {isLoggedIn ? (
                    <div className="col-md-3 text-end">
                        <Link to='/admin' className="btn btn-primary me-2">Dashboard</Link>
                        <button onClick={handleLogoutClick} className="btn btn-secondary">Log out</button>
                    </div>
                ) : (
                    <div className="col-md-3 text-end">
                        <Link to='/register' className="btn btn-primary me-2">Register</Link>
                        <Link to='/login' className="btn btn-outline-primary">Login</Link>
                    </div>
                )}
            </header>
        </div>
    );
}