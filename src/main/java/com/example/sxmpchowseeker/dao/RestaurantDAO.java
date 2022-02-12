package com.example.sxmpchowseeker.dao;

import java.util.UUID;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantDAO extends JpaRepository<Restaurant, UUID> {

}
