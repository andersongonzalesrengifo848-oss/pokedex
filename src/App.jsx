import { useState, useEffect} from "react";

function App(){
  //estado: empieza como arreglo vacio porque aun no hay datos
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    async function cargaPokemons() {
      const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
      const datos = await respuesta.json();
      setPokemons(datos.results);
    }
    cargaPokemons();
  }, []); //[] = ejecutar una sola vez al aparecer

  return(
    <div>
      <h1>PokeDex - Pokemon</h1>
      <ul>
        {pokemons.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>
    </div>
  )

}

export default App;