import React, {useState,useEffect} from 'react';
import ApiContext from './services/ApiContext';

function Provider({children}){
  const keysnumber = ['diameter',
    'orbital_period', 'rotation_period', 'surface_water', 'population'];
  const [planets, setPlanets] = useState([]);
  const [allPlanets, setAllPlanets] = useState([]);
  const [table, setTable] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  });

  const ONE_NEGATIVE = -1;
  const ascReorder = (toOrder) => {
    if (keysnumber.includes(filters.order.column)) {
      toOrder.sort((a, b) => a[filters.order.column] - b[filters.order.column]);
    } else {
      toOrder.sort((a, b) => {
        if (a[filters.order.column] > b[filters.order.column]) return 1;
        if (a[filters.order.column] < b[filters.order.column]) return ONE_NEGATIVE;
        return 0;
      });
    }
  };

  const planetsOrder = (toOrder) => {
    if (filters.order.sort === 'ASC') {
      ascReorder(toOrder);
    } else if (keysnumber.includes(filters.order.column)) {
      toOrder.sort((a, b) => b[filters.order.column] - a[filters.order.column]);
    } else {
      toOrder.sort((a, b) => {
        if (a[filters.order.column] < b[filters.order.column]) return 1;
        if (a[filters.order.column] > b[filters.order.column]) return ONE_NEGATIVE;
        return 0;
      });
    }
    setPlanets([...toOrder]);
  };

  const STARWARS_API_URL = 'https://swapi-trybe.herokuapp.com/api/planets/'; 
  const planetsData = async () => {
    const response = await fetch(STARWARS_API_URL);
    const result = response.json();
    return response.ok ? Promise.resolve(result) : Promise.reject(result);
  };

  const getPlanets = async () => {
    if (allPlanets.length === 0) {
    const { results } = await planetsData();
    planetsOrder(results);
    setAllPlanets([...results]);
    setTable(Object.keys(results[0]).filter((e) => e !== 'residents'));
    } else {
      planetsOrder([...allPlanets]);
    }
  }

  useEffect(() => {
    if (!filters.filterByName.name) getPlanets();
    else {
      const filteredPlanets = planets
        .filter(({ name }) => name.toLowerCase().includes(filters.filterByName.name));
        setPlanets(filteredPlanets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.filterByName]);

  const filterNumMore = (c, v) => planets.filter((p) => Number(p[c]) > Number(v));
  const filterNumLess = (c, v) => planets.filter((p) => Number(p[c]) < Number(v));
  const filterNumequal = (c, v) => planets.filter((p) => Number(p[c]) === Number(v));

  useEffect(() => {
    getPlanets();
    const { filterByNumericValues } = filters;
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') setPlanets(filterNumMore(column, value));
      if (comparison === 'menor que') setPlanets(filterNumLess(column, value));
      if (comparison === 'igual a') setPlanets(filterNumequal(column, value));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.filterByNumericValues, filters.order]);

  return(
    <ApiContext.Provider value={{planets,filters, table, setFilters}} >
      {children}
    </ApiContext.Provider>
  )
}

export default Provider;
