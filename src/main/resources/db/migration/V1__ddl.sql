CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurants
(
    id UUID,
    name VARCHAR(3000),
    address VARCHAR(3000),
    food_types VARCHAR(3000),
    locationx FLOAT,
    locationy FLOAT,
    location_exact VARCHAR(3000),
    PRIMARY KEY (id)
);

INSERT INTO restaurants
    (id, name, address, food_types, locationx, locationy, location_exact)
    VALUES
    (
        uuid_generate_v1(),
        'Test',
        '123 Test Street',
        'Food:Food2:Food3',
        69.69,
        420.69,
        '(69.6969696969, 420.6969696969)'
    );