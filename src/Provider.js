import React, {useState,useEffect} from 'react';
import ApiContext from './services/ApiContext';

function Provider({children}){

  const [allPlanets, setAllPlanets] = useState([]);
  const [table, setTable] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });

  const STARWARS_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/'; 
  const planetsData = async () => {
    const response = await fetch(STARWARS_API_URL);
    const result = response.json();
    return response.ok ? Promise.resolve(result) : Promise.reject(result);
  };

  const getPlanets = async () => {
    const { results } = await planetsData();
    setAllPlanets([...results]);
    setTable(Object.keys(results[0]).filter((e) => e !== 'residents'));
  }

  useEffect(() => {
    if (!filters.filterByName.name) getPlanets();
    else {
      const filteredPlanets = allPlanets
        .filter(({ name }) => name.toLowerCase().includes(filters.filterByName.name));
        setAllPlanets(filteredPlanets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.filterByName]);

  const filterNumMore = (c, v) => allPlanets.filter((p) => Number(p[c]) > Number(v));
  const filterNumLess = (c, v) => allPlanets.filter((p) => Number(p[c]) < Number(v));
  const filterNumequal = (c, v) => allPlanets.filter((p) => Number(p[c]) === Number(v));

  useEffect(() => {
    getPlanets();
    const { filterByNumericValues } = filters;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') setAllPlanets(filterNumMore(column, value));
      if (comparison === 'menor que') setAllPlanets(filterNumLess(column, value));
      if (comparison === 'igual a') setAllPlanets(filterNumequal(column, value));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.filterByNumericValues]);

  return(
    <ApiContext.Provider value={{allPlanets,filters, table, setFilters}} >
      {children}
    </ApiContext.Provider>
  )
}

export default Provider;
