CREATE TABLE comments
(
    id UUID default uuid_generate_v1(),
    text varchar(2000),
    PRIMARY KEY (id)
)