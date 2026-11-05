import { useState, useEffect} from "react";
import DataTable from "react-data-table-component"
import "./App.css"

function App(){
  //estado: empieza como arreglo vacio porque aun no hay datos
  const [pokemons, setPokemons] = useState([]);
  const [cargando, setCargando] = useState(true);

  //Definir las columnas de la tabla
  const columnas = [
    {
      name: "#",
      selector: (row, index) => index + 1,
      sortable: true,
      with: "80px"
    },
    {
      name: "Nombre Pokemon",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "URL",
      selector: (row) => row.url,
      cell: (row) => {
        <a href={row.url} target="_blank" rel="noreferrer">
          {row.url}
        </a>
      },
    },
  ];

  useEffect(() => {
    async function cargaPokemons() {
      const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const datos = await respuesta.json();
      setPokemons(datos.results);
      setCargando(false);
    }
    cargaPokemons();
  }, []); //[] = ejecutar una sola vez al aparecer

  return(
    <div>
      <h1>PokeDex - Pokemon</h1>
        <div className="tabla-contenedor">
          <DataTable
            columns={columnas}
            data={pokemons}
            progressPending={cargando}
            pagination
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5,10,20]}
            highlightOnHover
            responsive
          />
        </div>
    </div>
  )

}

export default App;