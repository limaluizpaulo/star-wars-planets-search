import React, {useContext} from 'react';
import ApiContext from '../services/ApiContext';

function Filter(){
  const { setFilters, filters } = useContext(ApiContext);

  const searchByText = ({ target: { value } }) => {
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  return(
    <input
    value={ filters.filterByName.name }
    onChange={ searchByText }
    data-testid="name-filter"
  />
  )
}

export default Filter;