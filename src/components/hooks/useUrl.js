import { useSearchParams } from "react-router-dom";

export function useUrl(){


const [search] = useSearchParams()
  
const mapLat = search.get('lat') || 40
const mapLng = search.get('lng') || 0

return [mapLat,mapLng]

}