import React, { useContext, useState } from 'react';
import ApiContext from '../services/ApiContext';

function Filter(){
  const { setFilters, filters } = useContext(ApiContext);

  const [opColumn, setOpColumn] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [filtersApplyed, setfiltersApplyed] = useState([]);
  const [column, setColumn] = useState('population');
  const [comp, setComp] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('');
  const searchByText = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  const handle = ({ target: { value } }, callBack) => {
    callBack(value);
  };

  const removeFilter = (apply) => {
    setFilters({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues
        .filter((fil) => fil.column !== apply),
    });
    setfiltersApplyed(filtersApplyed.filter((a) => a !== apply));
    setOpColumn([...opColumn, apply]);
  };

  const applyFilter = () => {
    setOpColumn(opColumn.filter((op) => op !== column));
    setfiltersApplyed([...filtersApplyed, column]);
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        {
          column,
          comparison: comp,
          value: valueFilter,
        }],
    });
  }

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

      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => handle(e, setValueFilter) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ applyFilter }
      >
        Filtrar
      </button>
      {filtersApplyed.map((apply) => (
        <p key={ apply } data-testid="filter">
          {apply}
          <button
            type="button"
            onClick={ () => removeFilter(apply) }
          >
            x
          </button>
        </p>))}
    </section>
  )
}

export default Filter;