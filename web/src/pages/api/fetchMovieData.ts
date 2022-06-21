export default async function fetchMovieData(): Promise<any> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${Math.floor(
      Math.random() * 20 + 1
    )}`
  );
  const data = await res.json();
  const filteredData = data.results.filter(
    (movie: { vote_count: number; }) => movie.vote_count >= 5000
  );
  // .replace(/\s/g, "" removes spaces
  console.log(filteredData[0].title.toLowerCase().replace(/\s/g, ""));
  return filteredData;
}