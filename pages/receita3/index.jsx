import { useEffect, useState, useCallback } from "react";

export async function getServerSideProps(context) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=6db40154&s=bagdad`);

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
export default function Movies({ data }) {
  const [movies, setMovies] = useState(data.Search);
  const [searchTerm, setSearchTerm] = useState("bagdad");
  const [loading, setLoading] = useState(false);

  // Utilize useCallback para memorizar a função de requisição
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=6db40154&s=${searchTerm}`
      );
      const data = await res.json();

      setMovies(data.Search);
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, fetchData]);

  return (
    <div>
      <h2>Lista de filmes</h2>

      <input
        placeholder="Digite o nome do filme"
        type="text"
        value={searchTerm}
        className="p-2 border border-gray-300 rounded m-2 text-black"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          movies?.map((movie) => (
            <div key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>
                {movie.Title} - {movie.Year}
              </h3>
            </div>
          )) || <p>Nenhum filme encontrado</p>
        )}
      </div>
    </div>
  );
}
