import React, {useState,useEffect} from 'react';
import ApiContext from './services/ApiContext';

function Provider({children}){

  const [allPlanets, setAllPlanets] = useState([]);

  const STARWARS_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/'; 
  const planetsData = async () => {
    const response = await fetch(STARWARS_API_URL);
    const result = response.json();
    return response.ok ? Promise.resolve(result) : Promise.reject(result);
  };

  const getPlanets = async () => {
    const { results } = await planetsData();
    console.log(results)
    setAllPlanets([...results]);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  return(
    <ApiContext.Provider value={{allPlanets}} >
      {children}
    </ApiContext.Provider>
  )
}

export default Provider;