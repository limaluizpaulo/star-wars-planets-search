import React, {useContext, useState, useEffect} from 'react';
import ApiContext from '../services/ApiContext';

function Table(){
  const {planets,table} = useContext(ApiContext);
  const [showPlanets, setPlanetsShow ] = useState();

  useEffect(() => {
    setPlanetsShow(planets.length !== 0);
  }, [planets])

  const buildTable = (names) => (<tr>{names.map((n) => <th key={n}> {n}</th>)}</tr>);
  return(
   <div>
     {showPlanets && (
       <table>
         <tbody>
          {buildTable(table)}
          {planets.map((
              { climate,
                created,
                diameter,
                edited,
                films,
                gravity,
                name,
                orbital_period: orbitalPeriod,
                population,
                rotation_period: rotationPeriod,
                surface_water: surfaceWater,
                terrain,
                url,
              },
            ) => (
              <tr key={ name }>
              <td data-testid="planet-name">{name}</td>
              <td>{rotationPeriod}</td>
              <td>{orbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{surfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
            ))}
         </tbody>
       </table>
     )}
   </div>
  )
}

export default Table;