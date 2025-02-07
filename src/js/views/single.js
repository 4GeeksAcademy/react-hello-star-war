import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Single = () => {
    const { store, actions } = useContext(Context);
    const { type, theid } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${theid}`);
                const result = await response.json();
                setData(result.result.properties);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [type, theid]);

    return (
        <div className="container mt-4 d-flex justify-content-center">
            {data ? (
                <div className="card shadow-lg" style={{ maxWidth: "600px" }}>
                    <img 
                        src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type === "planets" ? "planets" : "vehicles"}/${theid}.jpg`} 
                        className="card-img-top" 
                        alt={data.name} 
                    />
                    <div className="card-body text-center">
                        <h1 className="card-title text-primary">{data.name}</h1>
                        <p className="card-text text-muted">
                            {data.description ? data.description : "No description available for this character."}
                        </p>
                        <ul className="list-unstyled">
                            {type === "people" && (
                                <>
                                    <li><strong>Height:</strong> {data.height}</li>
                                    <li><strong>Mass:</strong> {data.mass}</li>
                                    <li><strong>Hair Color:</strong> {data.hair_color}</li>
                                    <li><strong>Skin Color:</strong> {data.skin_color}</li>
                                </>
                            )}
                            {type === "planets" && (
                                <>
                                    <li><strong>Climate:</strong> {data.climate}</li>
                                    <li><strong>Population:</strong> {data.population}</li>
                                    <li><strong>Terrain:</strong> {data.terrain}</li>
                                </>
                            )}
                        </ul>
                        <button 
                            className="btn btn-warning mt-2 px-4 py-2 fw-bold" 
                            onClick={() => actions.addFavorite({ uid: theid, name: data.name, type })}>
                            ❤️ Add to Favorites
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted">Loading...</p>
            )}
        </div>
    );
};

export default Single;
