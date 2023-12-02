import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `https://www.omdbapi.com/?apikey=6db40154&i=${id}`,
    fetcher
  );

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <div>Carregando...</div>;
  return (
    //construct the page with Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, Ratings, Metascore, imdbRating, imdbVotes, imdbID, Type, totalSeasons,
    <div key={data.imdbID}>
      <img src={data.Poster} alt={data.Title} />
      <h1>{data.Title}</h1>
      <p>Ano: {data.Year}</p>
      <p>Rating: {data.Rated}</p>
      <p>Lançamento: {data.Released}</p>
      <p>Duração: {data.Runtime}</p>
      <p>Gênero: {data.Genre}</p>
      <p>IMDB {data.imdbRating}</p>
      <p>Escritor {data.Writer}</p>
      <div>
        <a href={`/receita4`}>
          <button className="p-2 bg-white rounded-md text-black">Voltar</button>
        </a>
      </div>
    </div>
  );
}
