import React, { useContext, useState } from 'react';
import ApiContext from '../services/ApiContext';

function Filter(){
  const { setFilters, filters } = useContext(ApiContext);

  const [opColumn, setOpColumn] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [column, setColumn] = useState('population');
  const [comp, setComp] = useState('maior que');
  const searchByText = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  const handle = ({ target: { value } }, callBack) => {
    callBack(value);
  };

  return(
    <section> 
      <input
      value={ filters.filterByName.name }
      onChange={ searchByText }
      data-testid="name-filter"
    />

      <select data-testid="column-filter" onChange={ (e) => handle(e, setColumn) }>
        {opColumn.map((op) => (<option value={ op } key={ op }>{op}</option>))}
      </select>

      <select data-testid="comparison-filter" onChange={ (e) => handle(e, setComp) }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    </section>
  )
}

export default Filter;