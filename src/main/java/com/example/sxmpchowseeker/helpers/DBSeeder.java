package com.example.sxmpchowseeker.helpers;

import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class DBSeeder {

    @Autowired
    private JdbcTemplate jdbc;

    public void convertCSVData() {
        try (CSVReader reader = new CSVReaderBuilder(new FileReader("C:\\Users\\fland\\IdeaProjects\\SXMP-chowseeker-app\\src\\main\\resources\\db\\seed\\seed_data.csv")).withSkipLines(1).build()) {
            List<String[]> result = reader.readAll();
//            result.forEach(line -> System.out.println(Arrays.toString(line)));
            result.forEach(line -> {
                String query = String.format("INSERT INTO " +
                                "restaurants (id, name, location_description, address, photo, " +
                                "food_types, latitude, longitude, schedule, location_exact, likes, " +
                                "dislikes) VALUES (%s, %s, %s, %s, %s, %s, %f, %f, %s, %s, %d, %d,)", UUID.randomUUID(), line[0], line[1],
                        line[2], line[3], line[4], Float.parseFloat(line[5]), Float.parseFloat(line[6]), line[7], line[8], 0, 0);

//                System.out.println(query);
//                jdbc.update(query);
            });
            System.out.println("Database seeded.");
        } catch (IOException | CsvException e) {
            e.printStackTrace();
        }
    }
}
