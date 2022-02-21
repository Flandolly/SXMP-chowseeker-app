ALTER TABLE comments ADD COLUMN restaurant_id UUID;
ALTER TABLE comments ADD CONSTRAINT restaurant_comment FOREIGN KEY (restaurant_id) REFERENCES restaurants;