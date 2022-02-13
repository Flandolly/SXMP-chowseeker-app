package com.example.sxmpchowseeker;

import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.sxmpchowseeker.helpers.DBSeeder;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

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
			DBSeeder seedData = new DBSeeder();
			seedData.convertCSVData();
		}
	}

	public boolean checkIfDBNeedsSeed() {
		String sql = "CREATE TABLE restaurants (id uuid, name varchar(3000), location_description varchar(3000), address varchar(3000), photo varchar(3000), food_types varchar(3000), latitude float, longitude float, schedule varchar(3000), location_exact varchar(3000), likes integer, dislikes integer, primary key (id))";
		String sqlQuery = "SELECT * FROM restaurants";


		try {
			jdbc.execute(sql);
		}
		catch(Exception e) {
			System.out.println("Table already exists. Checking for seed data.");
		}

		List<Restaurant> restaurants = jdbc.query(sqlQuery, new BeanPropertyRowMapper<>(Restaurant.class));

		System.out.println("Done.");
		return restaurants.isEmpty();
	}
}
