# movie-rater

An example app built with Cloudflare Pages and Astro. This example shows how to build an app that can persist movie ratings. It uses:

1. TheMovieDB to fetch movie data
2. Cloudflare D1 to persist movie ratings
3. An Astro app (using React) deployed to Cloudflare Pages for the UI

## Setup

You will need an API key from TheMovieDB and a Cloudflare account to run this example yourself.

1. `git clone https://github.com/kristianfreeman/movie-rater.git`
2. `npm install`
3. `npm run deploy`
4. `npx wrangler@latest pages secret put MOVIEDB_API_KEY`

## Database setup

1. `npx wrangler@latest d1 databse create <your-db-name`
2. Copy the command output and add it to `wrangler.toml` (your `database_name` and `database_id` will be different):

```toml
[[d1_databases]]
binding = "DB"
database_name = "movie-rater-db"
database_id = "a584b5df-6b73-4092-a970-3171a85692ad"
```

3. `npx wrangler@latest d1 migrations apply --remote`
4. `npm run deploy`
