import { useEffect, useState } from "react";


export function useFetch(){

    const [dat,setDat]=useState({});

    useEffect(function(){
        async function getData(){
            const result = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await result.json();
            setDat(data);
        }
        getData();
    },[dat])
    return ({dat});
}
