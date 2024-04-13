import { useParams } from 'react-router-dom'
import styles from './City.module.css';
import { useCities } from '../contexts/CityContext';
import { useEffect } from 'react';
//-----------------------------------------------------------------------------------------------------------------------
function City () {
  const { id } = useParams()
  console.log(id);
const {getCity,currentCity}=useCities();

useEffect(function(){
  if(id){ getCity(id)}
 
},[id])

console.log(currentCity);
 const {cityName}=currentCity;


  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3><span>{cityName}</span></h3>
      </div>
      <div className={styles.row}></div>
      <h6>You went to {cityName}</h6>
      <div className={styles.row}>
      
      </div>
    </div>
  )
}

export default City
