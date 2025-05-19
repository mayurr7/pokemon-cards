import React from "react";

const PokemonInfo = ({ pokemonData }) => {
  return (
    <div>
      <li className="bg-white rounded-2xl shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6">
        <img
          src={pokemonData.sprites.other["official-artwork"].front_default}
          alt={pokemonData.name}
          className="w-36 h-32 mx-auto"
        />
        <h3 className="text-xl font-bold text-center capitalize mt-4">
          {pokemonData.name}
        </h3>
        <div className="mt-2 text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-semibold">Height:</span> {pokemonData.height}
          </p>
          <p>
            <span className="font-semibold">Weight:</span> {pokemonData.weight}
          </p>
          <p>
          <span className="font-semibold">Type:</span>{" "}
          {pokemonData.types.map((typeInfo) => typeInfo.type.name).join(", ")}
        </p>
        </div>
      </li>
    </div>
  );
};

export default PokemonInfo;
