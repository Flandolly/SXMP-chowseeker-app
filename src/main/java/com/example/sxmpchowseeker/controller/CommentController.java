package com.example.sxmpchowseeker.controller;


import com.example.sxmpchowseeker.dao.CommentDAO;
import com.example.sxmpchowseeker.dao.RestaurantDAO;
import com.example.sxmpchowseeker.entities.Comment;
import com.example.sxmpchowseeker.entities.Restaurant;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RequestMapping("comments")
@RestController
public class CommentController {
    private final RestaurantDAO restaurantDAO;
    private final CommentDAO commentDAO;

    public CommentController(RestaurantDAO restaurantDAO, CommentDAO commentDAO) {
        this.restaurantDAO = restaurantDAO;
        this.commentDAO = commentDAO;
    }

    @PostMapping
    public Object addComment(@RequestParam("text") String text, @RequestParam("restaurant_id") UUID restaurantID, BindingResult res) {

        if (res.hasErrors()) {
            return res.getAllErrors();
        }

        Comment comment = new Comment();
        Restaurant restaurant = restaurantDAO.getById(restaurantID);

        comment.setRestaurant(restaurant);
        comment.setText(text);

        return commentDAO.save(comment);
    }
}
