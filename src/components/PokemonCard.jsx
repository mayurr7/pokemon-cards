import React, { useEffect, useState } from "react";

const PokemonCard = ({ name, image }) => {
  const [pokemon, setPokemon] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon/65";

  const fetchPokemon = () => {
    fetch(API)
      .then((res) => res.json())
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  console.log(pokemon);

  const imageUrl = pokemon?.sprites?.other?.["official-artwork"]?.front_default;

  if (pokemon) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400">
          <div className="group relative w-72 h-96 bg-slate-200 rounded-xl shadow-xl transform transition-transform duration-500 hover:rotate-2 hover:scale-120 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-32 h-32 object-contain mx-auto mt-8"
            />
            <h2 className="text-center mt-4 text-xl font-bold capitalize">
              {pokemon.name}
            </h2>
          </div>
        </div>
      </>
    );
  }
};

export default PokemonCard;
