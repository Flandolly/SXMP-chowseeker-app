package com.example.sxmpchowseeker;

import com.example.sxmpchowseeker.entities.Restaurant;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

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
                    String query = String.format("INSERT INTO restaurants (name, location_description, address, food_types, latitude, longitude, schedule, location_exact, likes, dislikes) VALUES ('%s', '%s', '%s', '%s', %f, %f, '%s', '%s', 0, 0)",
                            line[0], line[1], line[2], line[4], Float.parseFloat(line[5]), Float.parseFloat(line[6]),
                            line[7], line[8]);
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
        String sql = "CREATE TABLE restaurants (id uuid default uuid_generate_v1(), name varchar(3000), location_description varchar(3000), address varchar(3000), photo varchar(3000) default null, food_types varchar(3000), latitude float, longitude float, schedule varchar(3000), location_exact varchar(3000), likes integer default 0, dislikes integer default 0, primary key (id))";
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
