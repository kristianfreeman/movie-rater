import type { APIRoute } from "astro";

type Rating = {
  movie_id: number;
  rating: number;
}

type RatingRequest = {
  movieId: number;
  rating: number;
}

export const GET: APIRoute = async ({ locals }) => {
  const { DB } = locals.runtime.env;
  const ratings = await DB.prepare("SELECT * FROM ratings").all<Rating>();
  const asObject = ratings.results.reduce((acc, rating) => {
    acc[rating.movie_id] = rating;
    return acc;
  }, {} as Record<number, Rating>);
  return Response.json(asObject);
}

export const POST: APIRoute = async ({ locals, request }) => {
  const { DB } = locals.runtime.env;
  const { movieId, rating } = await request.json<RatingRequest>();
  await DB.prepare("INSERT INTO ratings (movie_id, rating) VALUES (?, ?)").bind(movieId, rating).run();
  return new Response("OK");
}

