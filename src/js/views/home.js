import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadData();
    }, []);

    return (
        <div className="container mt-4">
 
            <h1 className="text-danger">Characters</h1>
            <div className="d-flex overflow-auto">
                {store.people?.map(person => (
                    <div key={person.uid} className="card" style={{ width: '18rem', margin: '10px' }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`} 
                            className="card-img-top" 
                            alt={person.name} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{person.name}</h5>
                            <Link to={`/single/people/${person.uid}`} className="btn btn-primary">
                                Learn More
                            </Link>
                            <button 
                                className="btn btn-outline-warning ms-2" 
                                onClick={() => actions.addFavorite(person)}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            
            <h1 className="text-danger mt-4">Planets</h1>
            <div className="d-flex overflow-auto">
                {store.planets?.map(planet => (
                    <div key={planet.uid} className="card" style={{ width: '18rem', margin: '10px' }}>
                        <img 
                            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`} 
                            className="card-img-top" 
                            alt={planet.name} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{planet.name}</h5>
                            <Link to={`/single/planets/${planet.uid}`} className="btn btn-primary">
                                Learn More
                            </Link>
                            <button 
                                className="btn btn-outline-warning ms-2" 
                                onClick={() => actions.addFavorite(planet)}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
