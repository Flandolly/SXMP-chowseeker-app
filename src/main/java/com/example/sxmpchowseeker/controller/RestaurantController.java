package com.example.sxmpchowseeker.controller;

import com.example.sxmpchowseeker.dao.RestaurantDAO;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequestMapping("api/restaurants")
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

    @GetMapping(value = "/search-address")
    public List<Restaurant> getRestaurantsByAddress(@RequestParam String address) {
        return restaurantDAO.findAllByAddressIgnoreCaseContaining(address);
    }

    @GetMapping(value = "/search-food")
    public List<Restaurant> getRestaurantsByName(@RequestParam String foodTypes) {
        return restaurantDAO.findAllByFoodTypesIgnoreCaseContaining(foodTypes);
    }

    @GetMapping(value = "/{id}")
    public Object getRestaurantById(@PathVariable("id") UUID id) {
        Optional<Restaurant> restaurant = restaurantDAO.findById(id);

        if (restaurant.isPresent()) {
            Restaurant foundRestaurant = restaurant.get();
            foundRestaurant.getComments();
            return foundRestaurant;
        }

        HashMap<String, Object> res = new HashMap<>();
        res.put("message", "Error finding restaurant");
        return res;
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
    public void deleteRestaurant(@PathVariable("id") UUID id) {
        restaurantDAO.deleteById(id);
    }
}
