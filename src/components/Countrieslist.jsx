// import React, { useContext, useEffect } from 'react'
import styles from './Countrieslist.module.css'
import Spinner from './Spinner'
import Countryitem from './Countryitem';
import { useCity } from '../contexts/CityContext';

export default function Countrieslist () {
  const {cities,loading}=useCity();
  if (loading) return <Spinner />
  
  if (!cities.length) return <p>Message</p>

  const countries = cities.reduce((arr,city)=>{
    if(!arr.map((el)=>el.country).includes(city.country))
    return [...arr,{country:city.country}]
else return arr;
  },[]);
 
  console.log(countries)
  return (
    <ul className={styles.countriesList}>
      {countries.map(country => {
        return <Countryitem  country={country} key={country.id} />
      })}
    </ul>
  )
}
