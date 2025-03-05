import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ColumnDef } from "@tanstack/react-table";
import { MoviesTable } from "./components/moviesTable";

interface Movie {
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  runtime: string;
  genre: string;
}

interface Principal {
  id: number;
  category: string;
  characters: string[];
  tconst: string;
  nconst: string;
}

interface Name {
  nconst: string;
  name: string;
  birth_year: string;
  death_year: string | null;
  primary_professions: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [principals, setPrincipals] = useState<Principal[]>([]);
  const [names, setNames] = useState<Name[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  useEffect(() => {
    // Fetch movies
    axios.get("http://127.0.0.1:8000/api/movies/").then((response) => {
      setMovies(response.data.results);
    });
    // Fetch names
    axios.get("http://127.0.0.1:8000/api/names/").then((response) => {
      setNames(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      // Fetch principals for the selected movie
      axios.get("http://127.0.0.1:8000/api/principals/").then((response) => {
        const filteredPrincipals = response.data.filter(
          (principal: Principal) => principal.tconst === selectedMovie
        );
        setPrincipals(filteredPrincipals);
      });
    }
  }, [selectedMovie]);

  const getActorName = (nconst: string) => {
    const actor = names.find((name) => name.nconst === nconst);
    return actor ? actor.name : "Unknown Actor";
  };

  const movieColumns: ColumnDef<Movie>[] = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'year', header: 'Year' },
    { accessorKey: 'genre', header: "Genre" },
  ]


  return (
    <div className="flex flex-col h-screen">
      <Header>
        <Header.Title>🎬 Movie Explorer</Header.Title>
        <Header.Nav />
      </Header>
      <h1 className="text-2xl font-bold mb-4"></h1>

      <div className="grid grid-cols-2 gap-4 overflow-auto h-full">
        {/* Movie List */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Movies</h2>
          <MoviesTable columns={movieColumns} data={movies}/>
        </div>

        {/* Principals and Actors */}
        {selectedMovie && (
          <div>
            <h2 className="text-lg font-semibold">
              Principals for {movies.find((m) => m.tconst === selectedMovie)?.title}
            </h2>
            <ul className="list-disc pl-6">
              {principals.map((principal) => (
                <li key={principal.id}>
                  <strong>{getActorName(principal.nconst)}</strong> - {principal.category}
                  {principal.characters && (
                    <span> as {principal.characters.join(", ")}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;