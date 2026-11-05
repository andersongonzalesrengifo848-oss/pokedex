import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./App.css";

function App() {
  // estado: empieza como arreglo vacio porque aun no hay datos
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Definir las columnas de la tabla
  const columnas = [
    {
      name: "#",
      selector: (row) => row.numero,
      sortable: true,
      center: true,
      width: "80px"
    },
    {
      name: "Imagen",
      width: "96px",
      center: true,
      cell: (row) => (
        <img
          src={row.imagenUrl}
          alt={row.name}
          width={48}
          height={48}
          loading="lazy"
        />
      )
    },
    {
      name: "Nombre Pokemon",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "URL",
      selector: (row) => row.imagenUrl,
      cell: (row) => (
        <a 
          href={row.imagenUrl} 
          target="_blank" 
          rel="noreferrer" 
          style={{ overflowWrap: "anywhere" }}
        >
          {row.imagenUrl}
        </a>
      )
    }
  ];

  useEffect(() => {
    async function cargaPokemons() {
      try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const datos = await respuesta.json();
        
        setPokemons(
          datos.results.map((pokemon, index) => {
            const id = Number(pokemon.url.split("/").filter(Boolean).at(-1));
            return {
              ...pokemon,
              id,
              numero: index + 1,
              // CORREGIDO: Se agregaron los backticks (`)
              imagenUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
          })
        );
      } catch (error) {
        console.error("Error al cargar pokémones:", error);
      } finally {
        setCargando(false);
      }
    }
    
    cargaPokemons();
  }, []);

  return (
    <div>
      <h1>PokeDex - Pokemon</h1>
      <div className="tabla-contenedor">
        <DataTable
          columns={columnas}
          data={pokemons}
          keyField="id"
          progressPending={cargando}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
}

export default App;