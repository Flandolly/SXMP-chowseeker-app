package com.example.sxmpchowseeker.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.example.sxmpchowseeker.dao.RestaurantDAO;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("restaurants")
@RestController

public class RestaurantController {

    @Autowired
    private RestaurantDAO restaurantDAO;

    @GetMapping
    public List<Restaurant> restaurants() {
        return restaurantDAO.findAll();
    }

    @GetMapping(value = "/{id}")
    public Restaurant getRestaurantById(@PathVariable("id") UUID id) {

        Optional<Restaurant> restaurant = restaurantDAO.findById(id);

        return restaurant.isPresent() ? restaurant.get() : null;
    }

    @PutMapping
    public void updateRestaurant(@RequestBody Restaurant newRestaurant) {

        Restaurant restaurant = restaurantDAO.getById(newRestaurant.getId());

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