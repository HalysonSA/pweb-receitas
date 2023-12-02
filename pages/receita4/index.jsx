import useSWR from "swr";

export default function Movies2() {
  const { data, error } = useSWR(
    `https://www.omdbapi.com/?apikey=6db40154&s=bad`,
    fetcher
  );

  if (error) return <div>falha na requisição...</div>;

  if (!data) return <div>carregando...</div>;

  return (
    <div>
      {data.Search.map((m) => (
        <div key={m.imdbID}>
          <img src={m.Poster} alt={m.Title} />
          <h3>{m.Title}</h3>
          <p>{m.Year}</p>
          <a href={`/receita4/movie/${m.imdbID}`}>
            <button className="p-2 my-2 bg-white rounded-md text-black">
              Detalhes
            </button>
          </a>
        </div>
      ))}
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);

  const json = await res.json();

  return json;
}
