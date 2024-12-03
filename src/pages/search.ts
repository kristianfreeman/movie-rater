import type { APIRoute } from "astro";

import stubData from '../json/search.json';

type SearchRequest = {
  search: string;
}

const stubbed = false;

export const POST: APIRoute = async ({ locals, request }) => {
  try {
    const { MOVIEDB_API_KEY: apiKey } = locals.runtime.env;

    if (stubbed) {
      return new Response(JSON.stringify(stubData));
    }

    const { search } = await request.json<SearchRequest>();
    if (!search) return new Response("Missing search term", { status: 400 });

    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json() as any;
    const movies = data.results.filter((movie: any) => !movie.adult).sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 10);
    return new Response(JSON.stringify(movies));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
