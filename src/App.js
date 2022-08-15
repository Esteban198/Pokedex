import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card'

function App() {

  let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const [pokemon, setPokemon] = useState([]);

  function fetchFoodDetails(url, index) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return [index, data];
      });
  }

  function fetchDiary() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        return data.results;
      })
  }

  useEffect(() =>
    (async () => {
      const data = await fetchDiary();

      const promises = data.map((poke, index) => fetchFoodDetails(poke.url, index));

      await Promise.all(promises).then(responses => {
        responses.map(response => {
          data[response[0]] = { ...data[response[0]], ...response[1] };
        })
      });

      setPokemon(promises.map(promises => promises.then(res => console.log(res[1]))));
    }));

  if (!pokemon)
    return <div>loading</div>;

  return (
    <div className="App">
      {pokemon?.map( poke =>
        <Card name={poke.name} 
              urlPhoto = {poke.sprites.front_default} />
      )}
    </div>
  );
}

export default App;
