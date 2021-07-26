import React, {useContext, useState, useEffect} from 'react';
import ApiContext from '../services/ApiContext';

function Table(){
  const {allPlanets} = useContext(ApiContext);
  const [showPlanets, setPlanetsShow ] = useState();

  useEffect(() => {
    setPlanetsShow(allPlanets.length !== 0);
  }, [allPlanets])

  const buildTable = (names) => (<tr>{names.map((n) => <th key={n}> {n}</th>)}</tr>);
  return(
   <div>
     {showPlanets && (
       <table>
         <tbody>
          {buildTable(Object.keys(allPlanets[0]).filter((e) => e !== 'residents'))}
          {allPlanets.map((
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