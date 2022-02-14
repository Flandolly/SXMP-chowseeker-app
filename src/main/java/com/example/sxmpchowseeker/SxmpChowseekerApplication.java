package com.example.sxmpchowseeker;

import com.example.sxmpchowseeker.entities.Restaurant;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.sxmpchowseeker.helpers.DBSeeder;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class SxmpChowseekerApplication implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbc;

    public static void main(String[] args) {
        SpringApplication.run(SxmpChowseekerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        if (checkIfDBNeedsSeed()) {
            try (CSVReader reader = new CSVReaderBuilder(new FileReader("C:\\Users\\fland\\IdeaProjects\\SXMP-chowseeker-app\\src\\main\\resources\\db\\seed\\seed_data.csv")).withSkipLines(1).build()) {
                List<String[]> result = reader.readAll();
                result.forEach(line -> {
                    String query = String.format("INSERT INTO " +
                                    "restaurants (id, name, location_description, address, photo, " +
                                    "food_types, latitude, longitude, schedule, location_exact, likes, " +
                                    "dislikes) VALUES (%1s, \"%2s\", \"%3s\", \"%4s\", \"%5s\", \"%6s\", %7f, %8f, \"%9s\", \"%10s\", %d, %d);", UUID.randomUUID(),
                            line[0], line[1], line[2], line[3], line[4], Float.parseFloat(line[5]), Float.parseFloat(line[6]),
                            line[7], line[8], 0, 0);
                    try {
                        jdbc.update(query);
                    } catch (DataAccessException e) {
                        e.printStackTrace();
                    }
                });
                System.out.println("Database seeded.");
            } catch (IOException | CsvException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean checkIfDBNeedsSeed() {
        String sql = "CREATE TABLE restaurants (id uuid, name varchar(3000), location_description varchar(3000), address varchar(3000), photo varchar(3000), food_types varchar(3000), latitude float, longitude float, schedule varchar(3000), location_exact varchar(3000), likes integer, dislikes integer, primary key (id))";
        String sqlQuery = "SELECT * FROM restaurants";


        try {
            jdbc.execute(sql);
        } catch (Exception e) {
            System.out.println("Table already exists. Checking for seed data.");
        }

        List<Restaurant> restaurants = jdbc.query(sqlQuery, new BeanPropertyRowMapper<>(Restaurant.class));
        return restaurants.isEmpty();
    }
}
