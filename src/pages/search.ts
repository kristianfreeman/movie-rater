import type { APIRoute } from "astro";

type SearchRequest = {
  search: string;
}

export const POST: APIRoute = async ({ locals, request }) => {
  try {
    const { search } = await request.json<SearchRequest>();
    if (!search) return new Response("Missing search term", { status: 400 });
    const apiKey = locals.runtime.env.MOVIEDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json() as any;
    const movies = data.results.filter((movie: any) => !movie.adult).sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 10);
    return new Response(JSON.stringify(movies));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
