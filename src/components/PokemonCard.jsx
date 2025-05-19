import React, { useEffect, useState } from "react";
import PokemonInfo from "./PokemonInfo";

const PokemonCard = ({ name, image }) => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=400";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      //console.log(data);

      const detailedPokemonData = await Promise.all(
        data.results.map(async (currData) => {
          const res = await fetch(currData.url);
          const data = await res.json();

          return data;
        })
      );

      console.log(detailedPokemonData);
      setPokemon(detailedPokemonData);

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const searchPokemon = pokemon.filter((currPokemon) => 
     currPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h1 className="text-center bg-red-500 h-10 text-2xl">Loading....</h1>;
  }

  if (error) {
    return (
      <div>
        <h1 className="text-center  bg-red-500 h-10 text-2xl">Error: {error.message}</h1>
      </div>
    );
  }

  const imageUrl = pokemon?.sprites?.other?.["official-artwork"]?.front_default;

  if (pokemon) {
    return (
      <>
        <section>
          <header>
            <h1 className="text-center text-2xl font-bold">Pokemon Army</h1>

            <div className="flex items-center justify-center mt-6 font-semibold">
              <h2 className="text-2xl flex items-center gap-x-4">
                <span>Search Your Fav:</span>
                <input
                  type="text"
                  placeholder="Pokemon..."
                  className="border border-gray-600 rounded-lg px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                  value={search} 
                  onChange={(e) => {setSearch(e.target.value)}}
                />
              </h2>
            </div>
          </header>

          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-400"> 
            <ul className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
              {
               // pokemon.map((currPokemon) => {) this is a old arr
                searchPokemon.map((currPokemon) => { //for search this is afiltered array
                  return <PokemonInfo key={currPokemon.id} pokemonData ={ currPokemon }/>
                })
              }
            </ul>
          </div>
        </section>
      </>
    );
  }
};

export default PokemonCard;
