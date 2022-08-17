import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './Card'
import { Pagination, Spinner, Dropdown } from 'react-bootstrap';


function App() {

  let pokesPorPagina = 10
  let paginas = 1;
  let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=1154";
  const [pokemon, setPokemon] = useState([]);
  const [indexPage, setIndexPage] = useState([]);

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

  function setIndex(e, index) {
    setIndexPage(index)
  }

  function renderComponents() {
    if (pokemon != "") {
      return (<div>
        <div className="row justify-content-center" key="1">
          {pokemon[indexPage]?.map(poke =>
            <Card key={poke.id}
              name={poke[1].name}
              urlPhoto={poke[1].sprites.front_default}
              weight={(poke[1].weight) / 10 + " Kg"}
              height={(poke[1].height) / 10 + " m"}
              type={poke[1].types.map(types => types.type.name + " ")}
            />
          )
          }
        </div>
        <div> 
          <Pagination>
            {pokemon?.map((poke, index) =>
              <Pagination.Item onClick={(event) => setIndex(event, index)}>{index + 1}</Pagination.Item>)}
          </Pagination>
        </div></div>
      )
    }
    else
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Spinner style={{ width: '10rem', height: '10rem' }} animation="grow" role="status">
          </Spinner>
        </div>)

  }

  useEffect(() =>
  (async () => {

    setIndexPage(0);
    const data = await fetchPokemonList();

    const promises = data.map((poke, index) => fetchPokemon(poke.url, index));

    await Promise.all(promises);

    const resultado = await Promise.all(promises);

    paginas = Math.ceil(resultado.length / pokesPorPagina);

    setPokemon(new Array(paginas).fill('').map((_, i) => resultado.slice(i * pokesPorPagina, (i + 1) * pokesPorPagina)));

  }

  ), []);

  return renderComponents();
}

export default App;
