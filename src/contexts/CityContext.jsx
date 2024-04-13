import { createContext,useEffect,useState,useContext } from "react";

const CityContext = createContext();

function CityProvider({children}){
    const URL = 'http://localhost:9000'
    const [cities,setCities] = useState([]);
    const [loading,setLoading]=useState(false);
    const [currentCity,setCurrentCity]=useState({});

    useEffect(function(){
        async function fetchCities () {
            try {
              setLoading(true)
              const res = await fetch(`${URL}/cities`)
              const data = await res.json()
              if(data){ setCities(data)}
             
              console.log(data)
            } catch (error) {
              alert(error)
            } finally {
              setLoading(false)
            }
          }
          fetchCities()
    },[]);
    return <CityContext.Provider value={{
        cities,loading,getCity,currentCity,createCity
    }}>{children}</CityContext.Provider>
    
async function getCity(id){
  try {
      const res = await fetch(`${URL}/cities/${id}`);
      const dat = await res.json();
      setCurrentCity(dat);
  } catch (error) {
      console.error(`Error fetching city with ID ${id}:`, error);
      // Handle the error appropriately
  }
  
}

    
async function createCity(newCity){
  try {
      const res = await fetch(`${URL}/cities`,{
        method:'POST',
        body:JSON.stringify(newCity),
        headers:{
          "Content-Type":"application/json"
        }
      });
      const dat = await res.json();
      setCurrentCity(dat);
      console.log(dat);
  } catch (error) {
      console.error(`Error fetching city with ID :`, error);
      // Handle the error appropriately
  }
  
}

}

function useCity(){
    const context = useContext(CityContext);
    if(context===undefined) throw new Error("context is used outside");
    return context
}

function useCities(){
  const context = useContext(CityContext);
  if(context===undefined) throw new Error("context is used outside");
  console.log(context);
  return context;

}


export {CityProvider,useCity,useCities};