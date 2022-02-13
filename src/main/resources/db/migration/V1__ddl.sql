CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurants
(
    id UUID,
    name VARCHAR(3000),
    location_description VARCHAR(3000),
    address VARCHAR(3000),
    photo VARCHAR(3000),
    food_types VARCHAR(3000),
    latitude FLOAT,
    longitude FLOAT,
    schedule VARCHAR(3000),
    location_exact VARCHAR(3000),
    likes INTEGER,
    dislikes INTEGER,
    PRIMARY KEY (id)
);

INSERT INTO restaurants
    (id, name, location_description, address, photo, food_types, latitude, longitude, schedule, location_exact, likes, dislikes)
    VALUES
    (
        uuid_generate_v1(),
        'Test',
        'Somewhere',
        '123 Test Street',
        'google.com',
        'Food:Food2:Food3',
        69.69,
        420.69,
        'pdf link',
        '(69.6969696969, 420.6969696969)',
        69,
        420
    );