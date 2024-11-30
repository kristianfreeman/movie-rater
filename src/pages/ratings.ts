import type { APIRoute } from "astro";

type Rating = {
  movie_id: number;
  rating: number;
}

type RatingRequest = {
  movieId: number;
  rating: number;
}

export const GET: APIRoute = async () => {
  const data: Record<string, Rating> = {
    "238": {
      "movie_id": 238,
      "rating": 5
    },
    "940721": {
      "movie_id": 940721,
      "rating": 4
    }
  }

  return Response.json(data);
}

export const POST: APIRoute = async ({ request }) => {
  const { movieId, rating } = await request.json<RatingRequest>();
  console.log(`Movie ${movieId} rated ${rating}`);

  return new Response("OK");
}
