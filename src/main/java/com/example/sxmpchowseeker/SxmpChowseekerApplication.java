package com.example.sxmpchowseeker;

import com.example.sxmpchowseeker.dao.RestaurantDAO;
import com.example.sxmpchowseeker.entities.Restaurant;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@SuppressWarnings("SqlInsertValues")
@SpringBootApplication
public class SxmpChowseekerApplication implements CommandLineRunner {

    private final RestaurantDAO restaurantDAO;

    public SxmpChowseekerApplication(RestaurantDAO restaurantDAO) {
        this.restaurantDAO = restaurantDAO;
    }

    public static void main(String[] args) {
        SpringApplication.run(SxmpChowseekerApplication.class, args);
    }

    @Configuration
    public static class CorsSetup extends WebMvcConfigurationSupport {

        @Override
        protected void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                    .allowedOrigins("*")
                    .allowedHeaders("*")
                    .maxAge(-1)
                    .allowCredentials(false);
        }
    }

    @Override
    public void run(String... args) {
        if (restaurantDAO.count() == 0) {
            try (CSVReader reader = new CSVReaderBuilder(new FileReader("C:\\Users\\fland\\IdeaProjects\\SXMP-chowseeker-app\\src\\main\\resources\\db\\seed\\seed_data.csv"))
                    .withSkipLines(1)
                    .build()) {
                List<String[]> result = reader.readAll();
                result.forEach(line -> {
                    Restaurant newRestaurant = new Restaurant(
                            UUID.randomUUID(),
                            line[0],
                            line[1],
                            line[2],
                            line[3],
                            line[4],
                            Float.parseFloat(line[5]),
                            Float.parseFloat(line[6]),
                            line[7],
                            line[8],
                            0,
                            0,
                            null);
                    restaurantDAO.save(newRestaurant);
                });
                System.out.println("Database seeded.");
            } catch (IOException | CsvException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Database is already seeded.");
        }
    }
}
