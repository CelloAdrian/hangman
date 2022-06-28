import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetchMovieData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'unsupported_method' });

  try {
    const apiResult = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        process.env.TMDB_API_KEY
      }&page=${Math.floor(Math.random() * 20 + 1)}`
    );
    const movieData = await apiResult.json();
    const filteredData = movieData.results.filter(
      (movie: { vote_count: number }) => movie.vote_count >= 5000
    );
    // .replace(/\s/g, "" removes spaces
    console.log(filteredData[0].title.toLowerCase().replace(/\s/g, ''));

    return res.status(200).json({ data: filteredData });
  } catch (err) {
    console.log((err as Error).message);
    return res.status(500).json({ error: 'internal_server_error' });
  }
}
