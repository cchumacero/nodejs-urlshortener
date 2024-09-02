CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    original_url VARCHAR(255),
    short_url SERIAL
);

INSERT INTO urls (original_url)
    VALUES ('https://www.twitch.tv/');