import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card'
import { Pagination } from 'react-bootstrap';

function App() {

  let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const [pokemon, setPokemon] = useState([]);

  function fetchPokemon(url, index) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return [index, data];
      }).catch(err => console.log(err));
  }

  function fetchPokemonList() {
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        return data.results;
      })
  }

  useEffect(() =>
  (async () => {
    const data = await fetchPokemonList();

    const promises = data.map((poke, index) => fetchPokemon(poke.url, index));

    await Promise.all(promises).then(responses => {
      responses.map(response => {
        data[response[0]] = { ...data[response[0]], ...response[1] };
      })
    });

    const result = await Promise.all(promises)
    setPokemon(result)
  }

  ));

  if (!pokemon)
    return <div>loading</div>

  return (
    <div className="row justify-content-center">
        {pokemon?.map(poke =>
            <Card name={poke[1].name}
            urlPhoto={poke[1].sprites.front_default}
            weight={(poke[1].weight)/10 + " Kg"}
            height={(poke[1].height)/10 + " m"}
            type={poke[1].types.map(types=> types.type.name + " ")}
          />
        )}
      <Pagination>
        <Pagination.Prev />
        <Pagination.Ellipsis />
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
      </Pagination>
    </div>
  );
}

export default App;
