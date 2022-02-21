CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE restaurants
(
    id                   uuid          default uuid_generate_v1(),
    name                 varchar(3000),
    location_description varchar(3000),
    address              varchar(3000),
    photo                varchar(3000) default null,
    food_types           varchar(3000),
    latitude             float,
    longitude            float,
    schedule             varchar(3000),
    location_exact       varchar(3000),
    likes                integer       default 0,
    dislikes             integer       default 0,
    primary key (id)
)