import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import starWarsLogo from "../../img/star-wars-logo.png"; // Asegúrate de importar la imagen correctamente

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark mb-3 px-3">
            <Link to="/">
                <img 
                    src={starWarsLogo} 
                    alt="Star Wars Logo" 
                    style={{ height: "70px", filter: "drop-shadow(0px 0px 8px rgba(255,255,255,0.8))" }} 
                />
            </Link>
            <div className="ml-auto">
                <div className="dropdown">
                    <button className="btn btn-warning dropdown-toggle fw-bold px-3 py-2" type="button" id="favoritesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites <span className="badge bg-dark">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center px-3">
                                    <Link to={`/single/${fav.type}/${fav.uid}`} className="dropdown-item">{fav.name}</Link>
                                    <button className="btn btn-sm btn-danger ms-2" onClick={() => actions.removeFavorite(fav.uid)}>🗑️</button>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item text-center">No favorites yet</li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
