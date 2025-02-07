const getState = ({ getStore, setStore }) => {
    return {
        store: {
            people: [],
            planets: [],
            vehicles: [],
            favorites: []
        },
        actions: {
            loadData: async () => {
                try {
                    
                    let [peopleResponse, planetsResponse, vehiclesResponse] = await Promise.all([
                        fetch("https://www.swapi.tech/api/people"),
                        fetch("https://www.swapi.tech/api/planets"),
                        fetch("https://www.swapi.tech/api/vehicles")
                    ]);

                    let [peopleData, planetsData, vehiclesData] = await Promise.all([
                        peopleResponse.json(),
                        planetsResponse.json(),
                        vehiclesResponse.json()
                    ]);

                 
                    const fetchDetails = async (url) => {
                        let response = await fetch(url);
                        let data = await response.json();
                        return data.result.properties;
                    };

                
                    let detailedPeople = await Promise.all(
                        peopleData.results.map(async (person) => ({
                            uid: person.uid,
                            ...await fetchDetails(person.url)
                        }))
                    );

                    let detailedPlanets = await Promise.all(
                        planetsData.results.map(async (planet) => ({
                            uid: planet.uid,
                            ...await fetchDetails(planet.url)
                        }))
                    );

                    let detailedVehicles = await Promise.all(
                        vehiclesData.results.map(async (vehicle) => ({
                            uid: vehicle.uid,
                            ...await fetchDetails(vehicle.url)
                        }))
                    );

                    
                    setStore({
                        people: detailedPeople,
                        planets: detailedPlanets,
                        vehicles: detailedVehicles
                    });

                    console.log("People:", detailedPeople);
                    console.log("Planets:", detailedPlanets);
                    console.log("Vehicles:", detailedVehicles);
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            },

            addFavorite: item => {
                const store = getStore();
                if (!store.favorites.some(fav => fav.uid === item.uid)) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },

            removeFavorite: uid => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter(item => item.uid !== uid) });
            }
        }
    };
};

export default getState;
