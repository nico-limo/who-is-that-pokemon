import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [pokedex, setPokedex] = useState("");
  const [guessPokemon, setguessPokemon] = useState({});
  const [correct, setCorrect] = useState(false);
  useEffect(() => {
    whoIsThatPokemon();

  }, []);

  const pokeId = () => Math.floor(Math.random() * 152);

  const whoIsThatPokemon = () => {
    axios.get(`https:/pokeapi.co/api/v2/pokemon/${pokeId()}`).then((res) => {
      setguessPokemon(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokedex();
    if (pokedex === guessPokemon.name) {
      setCorrect(true);
      alert("YOU WIN");
    } else {
      alert("YOU LOSE");
    };
    setTimeout(() => {
      alert('Oh... aparecio otro pokemon')
      setCorrect(false);
      whoIsThatPokemon();
    }, 2000);
    
  };
  console.log(guessPokemon.name);
  return (
    <div className="app-wrapper">
      <header>
        <h1 className="title">Who is that Pokemon</h1>
        <h3 className="subtitle">React Hooks Training</h3>
      </header>
      <form onSubmit={handleSubmit}>
        <section className="pokemon">
          <h2>Adivina el Pokemon</h2>
          <img
            style={
              !correct
                ? { filter: "brightness(0%)" }
                : { filter: "brightness(100%)" }
            }
            src={!guessPokemon.id ?  <span></span> :
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${guessPokemon.id}.png`
            }
            className="sprite"
          />
          <input
            type="text"
            value={pokedex ? pokedex : ""}
            className="catch-input"
            placeholder="Introduce el nombre"
            onChange={(e) => {
              setPokedex(e.target.value);
            }}
          />
          <button onSubmit className="catch-input">
            CATCH
          </button>
        </section>
      </form>
    </div>
  );
};

export default App;
