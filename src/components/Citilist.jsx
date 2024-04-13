import { useCity } from '../contexts/CityContext';
//------------------------------------------------------------------------------------------------------------------------
import React from 'react';
import styles from './Citylist.module.css';
import Spinner from './Spinner';
import Cityitem from './Cityitem';
//-------------------------------------------------------------------------------------------------------------------------


export default function Citilist() {
  const { cities, loading } = useCity()

    if(loading)return <Spinner/>
    
if(!cities.length) return <p>Message</p>
  return (
<ul className={styles.cityList}>
{cities.map((city)=>{
    return (<Cityitem city={city} key={city.id} />)
})}

</ul>
  )
};
