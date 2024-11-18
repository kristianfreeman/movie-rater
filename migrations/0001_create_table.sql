-- Migration number: 0001 	 2024-11-18T18:51:35.972Z
DROP TABLE IF EXISTS "ratings";
CREATE TABLE "ratings" (
  "movie_id" INTEGER NOT NULL PRIMARY KEY,
  "rating" INTEGER NOT NULL
);
