package com.example.sxmpchowseeker.dao;

import java.util.List;
import java.util.UUID;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantDAO extends JpaRepository<Restaurant, UUID> {
    List<Restaurant> findAllByAddressIgnoreCaseContaining(String address);
    List<Restaurant> findAllByFoodTypesIgnoreCaseContaining(String foodTypes);
}
