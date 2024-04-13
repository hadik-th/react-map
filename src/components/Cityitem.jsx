import React from 'react'
import styles from './Cityitem.module.css';
import {Link} from 'react-router-dom';
export default function Cityitem ({ city }) {
  const { cityName, emoji,id, position } = city
  return (
    <li className={styles.cityItem} >
    <Link className={city.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <button className={styles.deleteBtn}>&times;</button>
      </Link>
    
    </li>
  )
}
