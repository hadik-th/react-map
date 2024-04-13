import styles from "./Countryitem.module.css";

function CountryItem({ country ,key}) {
  return (
    <li key={country.id} className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;