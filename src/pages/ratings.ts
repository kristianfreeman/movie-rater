import type { APIRoute } from "astro";

type Rating = {
  movie_id: number;
  rating: number;
}

export const GET: APIRoute = async () => {
  // const { DB } = locals.runtime.env;
  // const ratings = await DB.prepare("SELECT * FROM ratings").all<Rating>();
  //const asObject = ratings.results.reduce((acc, rating) => {
  //  acc[rating.movie_id] = rating;
  //  return acc;
  //}, {} as Record<number, Rating>);

  const ratings: Record<number, Rating> = {
    1: {
      movie_id: 1,
      rating: 1
    }, 2: {
      movie_id: 2,
      rating: 2
    }
  }

  return Response.json(ratings);
}

type RatingRequest = {
  movieId: number;
  rating: number;
}

export const POST: APIRoute = async ({ request }) => {
  const { movieId, rating } = await request.json<RatingRequest>();
  //const { DB } = locals.runtime.env;
  //await DB.prepare("INSERT INTO ratings (movie_id, rating) VALUES (?, ?)").bind(movieId, rating).run();
  return Response.json({ movieId, rating });
}
