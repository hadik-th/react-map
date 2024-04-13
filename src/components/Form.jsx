import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//------------------------------------------------------------------------------------------------------------------------
import { useUrl } from './hooks/useUrl';
import { useCities } from '../contexts/CityContext';
import Button from './Button'
import styles from './Form.module.css'
import Spinner from './Spinner'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function convertToEmoji (countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form () {
  const { createCity } = useCities() // VALUE GETTING FROM CUSTOME USE-HOOK
  const [Lat, Lng] = useUrl() //VALUE GETTING FROM CUSTOME USE-HOOK
  const [loading, setLoading] = useState(false)
  const [cityName, setCityname] = useState('')
  const [countryName, setCountryname] = useState('')
  const [error, setError] = useState('')
  const [date, setDate] = useState(new Date())

  //----------------------------------------
const navigation = useNavigate();
  //-----------------------------------------------------------------------------------------

  useEffect(
    function () {
      if (!Lat && !Lng) {
        return
      }
      async function fetchCity () {
        try {
          setLoading(true)
          setError('')
          const res = await fetch(`${URL}?latitude=${Lat}&longitude=${Lng}`)
          const data = await res.json()
          if (!data.countryCode)
            throw new Error('not valid city, click somewhere else')
          console.log(data)
          setCityname(data.city || data.locality || '')
          setCountryname(data.countryName)
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

      fetchCity()
    },

    [Lat, Lng]
  )
  if (!Lat && !Lng) return <p>not valid lat and lng,start by clicking</p>
  if (loading) return <Spinner />

  if (error) return <p>{error}</p>

  function handleSubmit (e) {
    e.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      countryName,
      position: { lat: Lat, lng: Lng },
      // position:{Lat,Lng},
      notes: '',
      id: new Date(),
      date,
      emoji: ''
    }
    console.log(newCity)
    if (createCity) createCity(newCity)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={e => {
            console.log(e.target.value)
            if (e.target.value) {
              setCityname(e.target.value)
            }
          }}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to City?</label>
        <DatePicker
          id='date'
          onChange={date => {
            setDate(date)
          }}
          selected={date}
          dateFormat='dd/MM/yyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to city</label>
        <textarea id='notes' />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>ADD</Button>
       <button onClick={()=>{
      navigation(-1);
       }}>Back</button>
      </div>
    </form>
  )
}

export default Form;
