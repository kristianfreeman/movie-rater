import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
};

type RatingResponse = Record<string, Rating>;

type Rating = {
  movieId: number;
  rating: number;
  draft?: boolean;
}

export default function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [ratings, setRatings] = useState<Record<number, Rating>>({});
  const [searchValue] = useDebounce(search, 500);

  const getMovies = async (search: string) => {
    const response = await fetch(`/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ search }),
    });
    const data = await response.json<Movie[]>();
    setResults(data);
  };

  const getRatings = async () => {
    const response = await fetch('/ratings');
    const data = await response.json<RatingResponse>();
    setRatings(data);
  };

  const updateRatingLocally = (e: React.ChangeEvent<HTMLSelectElement>, movieId: number) => {
    const rating = e.target.value;
    if (!movieId || !rating) return;

    const newRatings = Object.assign({}, ratings, {
      [movieId]: { movieId, rating: Number(rating), draft: true },
    });

    setRatings(newRatings);
  };

  const submitRating = async (movieId: number) => {
    let rating = ratings[movieId];
    if (!rating) return;

    await fetch('/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rating)
    });

    const newRatings = Object.assign({}, ratings, {
      [movieId]: { ...ratings[movieId], draft: false },
    });

    setRatings(newRatings);
  };

  useEffect(() => {
    getRatings();
  }, []);

  useEffect(() => {
    if (!searchValue) return;
    getMovies(searchValue);
  }, [searchValue]);

  return (
    <div>
      <input
        autoFocus
        placeholder="Search for a movie"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        value={search}
      />

      <div style={{ marginTop: '1rem' }}>
        {results.map((movie) => (
          <div key={movie.id} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <img style={{ background: '#eee', width: '187px', height: '280px', objectFit: 'cover' }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div style={{ marginLeft: '2rem' }}>
              <h3>{movie.title}</h3>
              <p style={{ color: "rgba(0, 0, 0, 0.8)" }}>{movie.overview}</p>

              {ratings[movie.id] && !ratings[movie.id].draft ? (
                <div>
                  <span><strong>Your rating:</strong> {ratings[movie.id].rating}/5</span>
                </div>
              ) : (
                <div style={{ gap: '1rem', display: 'flex' }}>
                  <span><strong>Your rating:</strong></span>
                  <select onChange={e => updateRatingLocally(e, movie.id)} value={ratings[movie.id]?.rating || ''}>
                    <option disabled value="">Select a rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button onClick={() => submitRating(movie.id)}>Submit</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}

