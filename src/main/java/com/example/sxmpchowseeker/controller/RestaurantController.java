package com.example.sxmpchowseeker.controller;

import com.example.sxmpchowseeker.dao.RestaurantDAO;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("restaurants")
@RestController

public class RestaurantController {

    private final RestaurantDAO restaurantDAO;

    public RestaurantController(RestaurantDAO restaurantDAO) {
        this.restaurantDAO = restaurantDAO;
    }

    @GetMapping
    public List<Restaurant> restaurants() {
        return restaurantDAO.findAll();
    }

    @GetMapping(value = "/{id}")
    public Restaurant getRestaurantById(@PathVariable("id") UUID id) {
        Optional<Restaurant> restaurant = restaurantDAO.findById(id);
        return restaurant.orElse(null);
    }

    @PutMapping(value = "/{id}")
    public void updateRestaurant(@RequestBody Restaurant newRestaurant) {
        restaurantDAO.save(restaurantDAO.getById(newRestaurant.getId()));
    }

    @PostMapping
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantDAO.save(restaurant);
    }

    @DeleteMapping(value = "/{id}")
    public void deletePerson(@PathVariable("id") UUID id) {
        restaurantDAO.deleteById(id);
    }
}
